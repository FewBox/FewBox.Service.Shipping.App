import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initGatewayPage, initNamespaceDropdownList, createGateway, deleteGateway } from '../actions';
import { Gateway, Store, Namespace } from '../reducers/State';
import GatewayCreation from '../components/GatewayCreation';
import { ProtocolOptions } from '../jsons';
import HelpFormattedMessage from '../components/HelpFormattedMessage';


export interface IGatewayPageProps {
    namespaces: Namespace[];
    gatewaies: Gateway[];
    initGatewayPage: () => void;
    initNamespaceDropdownList: () => void;
    createGateway: (any) => void;
    deleteGateway: (any) => void;
    isHelp: boolean;
}

class GatewayPage extends React.Component<IGatewayPageProps, any> {
    componentDidMount() {
        this.props.initGatewayPage();
        this.props.initNamespaceDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <GatewayCreation isHelp={this.props.isHelp} namespaces={this.props.namespaces} protocolOptions={ProtocolOptions}
                        reload={this.props.initGatewayPage} create={this.props.createGateway} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.gatewaies}
                        renderItem={(item: Gateway) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteGateway({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                        </Collapse.Panel>
                                    </Collapse>} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ gatewayPage, masterPage, settingPage }: Store) => ({
    gateways: gatewayPage.gateways,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initGatewayPage,
    initNamespaceDropdownList,
    createGateway,
    deleteGateway
};

export default connect(mapStateToProps, mapDispatchToProps)(GatewayPage);