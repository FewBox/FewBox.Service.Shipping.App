import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Badge } from 'antd';
import { initNamespacePage, deleteNamespace, enableIstio, disableIstio, createNamespace } from '../actions';
import { Namespace, Store } from '../reducers/State';
import NamespaceCreation from '../components/NamespaceCreation';
import { IstioIcon } from '../components/Icon';
import Search from 'antd/lib/input/Search';
import ResourcesCard from '../components/ResourcesCard';


export interface INamespacePagePageProps {
    namespaces: Namespace[];
    initNamespacePage: () => void;
    createNamespace: (name: string) => void;
    deleteNamespace: (name: string) => void;
    enableIstio: (name: string) => void;
    disableIstio: (name: string) => void;
    intl: any;
    isListLoading: boolean;
}

class NamespacePage extends React.Component<INamespacePagePageProps, any> {
    componentDidMount() {
        this.props.initNamespacePage();
    }
    render() {
        return (
            <div>
                {
                    //<Row>
                    //<Search placeholder={this.props.intl.formatMessage({ id: 'Label.Search' })} onSearch={value => console.log(value)} />
                    //</Row>
                }
                <Row gutter={16}>
                    <NamespaceCreation create={this.props.createNamespace} reload={this.props.initNamespacePage} />
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.namespaces}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteNamespace(item.name); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                            <Switch checkedChildren={<IstioIcon />} unCheckedChildren={<IstioIcon />} onChange={(checked) => { if (checked) { this.props.enableIstio(item.name); } else { this.props.disableIstio(item.name); } }} checked={item.isIstioInjected} />,
                            <Icon type="ellipsis" />]}
                        renderBasic={(item) => <Descriptions title={item.name} size='small' column={1} bordered>
                            <Descriptions.Item label={<FormattedMessage id="Label.Status" />}><Badge color={item.status === 'Active' ? 'green' : 'red'} text={item.status} /></Descriptions.Item>
                            <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ namespacePage }: Store) => ({
    namespaces: namespacePage.items,
    isListLoading: namespacePage.isListLoading
});

const mapDispatchToProps = {
    initNamespacePage,
    createNamespace,
    deleteNamespace,
    enableIstio,
    disableIstio
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(NamespacePage));