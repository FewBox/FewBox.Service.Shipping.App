import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import {
    initVirtualServicePage, initNamespaceDropdownList, createVirtualService, deleteVirtualService, initVirtualServiceGatewayDropdownList,
    initVirtualServiceServiceDropdownList, initVirtualServiceDeploymentDropdownList, selectVirtualService, showDrawer
} from '../actions';
import { VirtualService, Store, Namespace, Gateway, Service, Deployment } from '../reducers/State';
import VirtualServiceCreation from '../components/VirtualServiceCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import { MatchOptions } from '../jsons';
import ResourcesCard from '../components/ResourcesCard';

export interface IVirtualServicePageProps {
    namespaces: Namespace[];
    virtualServices: VirtualService[];
    gateways: Gateway[];
    services: Service[];
    deployments: Deployment[];
    initVirtualServicePage: () => void;
    initNamespaceDropdownList: () => void;
    createVirtualService: (any) => void;
    deleteVirtualService: (any) => void;
    initVirtualServiceGatewayDropdownList: (namespaceName: string) => void;
    initVirtualServiceServiceDropdownList: (namespaceName: string) => void;
    initVirtualServiceDeploymentDropdownList: (app: string) => void;
    selectVirtualService: (namespaceName: string, name: string) => void;
    showDrawer: (drawerType: any) => void;
    isHelp: boolean;
    isListLoading: boolean;
}

class VirtualServicePage extends React.Component<IVirtualServicePageProps, any> {
    componentDidMount() {
        this.props.initVirtualServicePage();
        this.props.initNamespaceDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <VirtualServiceCreation isHelp={this.props.isHelp} namespaces={this.props.namespaces} gateways={this.props.gateways} services={this.props.services}
                        deployments={this.props.deployments} refreshDeployments={this.props.initVirtualServiceDeploymentDropdownList} matchOptions={MatchOptions}
                        refreshGateways={this.props.initVirtualServiceGatewayDropdownList} refreshServices={this.props.initVirtualServiceServiceDropdownList}
                        reload={this.props.initVirtualServicePage} create={this.props.createVirtualService} />
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.virtualServices}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteVirtualService({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                            <Icon type="help" />,
                            <Icon type="ellipsis" onClick={() => { this.props.selectVirtualService(item.namespace, item.name); this.props.showDrawer({ type: 'VirtualService', namespace: item.namespace, name: item.name }); }} />]}
                        renderBasic={(item) => <Descriptions size='small' column={1} bordered>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.Namespace" />}>{item.namespace}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                        renderMore={(item) => <Descriptions size='small' column={1} bordered>
                            {item.hosts.map((host, index) => {
                                return <Descriptions.Item key={'host' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Host' id="Label.HostItem" values={{ key: index }} />}>{host}</Descriptions.Item>
                            })}
                            {item.gateways.map((gateway, index) => {
                                return <Descriptions.Item key={'gateway' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Gateway' id="Label.GatewayItem" values={{ key: index }} />}>{gateway}</Descriptions.Item>
                            })}
                            {item.https.map((http, index) => {
                                return <Descriptions.Item key={'http' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Match' id="Label.HttpItem" values={{ key: index }} />}>
                                    {http.uris != null ? http.uris.map((uri, index) => {
                                        return <p key={'uri' + index}>{JSON.stringify(uri)}</p>
                                    }) : null}
                                    {http.headers != null ? http.headers.map((header, index) => {
                                        return <p key={'header' + index}>{JSON.stringify(header)}</p>
                                    }) : null}
                                    {http.routes.map((route, index) => {
                                        return <p key={'route' + index}>{route.host} : {route.subset ? route.subset : route.port}</p>
                                    })}
                                </Descriptions.Item>
                            })}
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ virtualServicePage, masterPage, settingPage }: Store) => ({
    virtualServices: virtualServicePage.items,
    isListLoading: virtualServicePage.isListLoading,
    gateways: virtualServicePage.gateways,
    services: virtualServicePage.services,
    deployments: virtualServicePage.deployments,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initVirtualServicePage,
    initNamespaceDropdownList,
    createVirtualService,
    deleteVirtualService,
    initVirtualServiceGatewayDropdownList,
    initVirtualServiceServiceDropdownList,
    initVirtualServiceDeploymentDropdownList,
    selectVirtualService,
    showDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(VirtualServicePage);