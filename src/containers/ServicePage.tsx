import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initServicePage, deleteService, createService, initNamespaceDropdownList } from '../actions';
import { Service, Store, Namespace } from '../reducers/State';
import ServiceCreation from '../components/ServiceCreation';
import { ServiceOptions, SessionAffinityOptions } from '../jsons';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import ResourcesCard from '../components/ResourcesCard';


export interface IServicePageProps {
    namespaces: Namespace[];
    initNamespaceDropdownList: () => void;
    services: Service[];
    initServicePage: () => void;
    createService: (any) => void;
    deleteService: (any) => void;
    isHelp: boolean;
    isListLoading: boolean;
}

class ServicePage extends React.Component<IServicePageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initServicePage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <ServiceCreation isHelp={this.props.isHelp} create={this.props.createService} reload={this.props.initServicePage}
                        serviceOptions={ServiceOptions} sessionAffinityOptions={SessionAffinityOptions} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.services}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteService({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                            <Icon type="help" />,
                            <Icon type="ellipsis" />]}
                        renderBasic={(item) => <Descriptions size='small' column={1} bordered>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Selector" helpId="Help.Selector" />}><Tag color="magenta">{item.selector}</Tag></Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ClusterIP" helpId="Help.ClusterIP" />}>{item.clusterIP}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Type" helpId="Help.Type" />}>{item.type}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.SessionAffinity" helpId="Help.SessionAffinity" />}>{item.sessionAffinity}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                        renderMore={(item) => <Descriptions size='small' column={1} bordered>
                            {item.ports.map((port, index) => {
                                return <Descriptions.Item key={'containerPort' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ServicePortItem" helpId="Help.Port" values={{ key: port.name }} />}>{port.port}=>{port.targetPort}</Descriptions.Item>
                            })}
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ servicePage, masterPage, settingPage }: Store) => ({
    services: servicePage.items,
    isListLoading: servicePage.isListLoading,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initServicePage,
    createService,
    deleteService,
    initNamespaceDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);