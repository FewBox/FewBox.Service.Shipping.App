import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initYardAreaPage, initNamespaceDropdownList, constructYardArea, demolishYardArea, initYardAreaGateAreaDropdownList, initVirtualServiceServiceDropdownList, initVirtualServiceDeploymentDropdownList } from '../actions';
import { VirtualService, Store, Namespace, Gateway, Service, Deployment } from '../reducers/State';
import VirtualServiceCreation from '../components/VirtualServiceCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import { MatchOptions } from '../jsons';

export interface IVirtualServicePageProps {
    namespaces: Namespace[];
    virtualServices: VirtualService[];
    gatewaies: Gateway[];
    services: Service[];
    deployments: Deployment[];
    initVirtualServicePage: () => void;
    initNamespaceDropdownList: () => void;
    createVirtualService: (any) => void;
    deleteVirtualService: (any) => void;
    initVirtualServiceGatewayDropdownList: (namespaceName: string) => void;
    initVirtualServiceServiceDropdownList: (namespaceName: string) => void;
    initVirtualServiceDeploymentDropdownList: (app: string) => void;
    isHelp: boolean;
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
                    <VirtualServiceCreation isHelp={this.props.isHelp} namespaces={this.props.namespaces} gatewaies={this.props.gatewaies} services={this.props.services}
                        deployments={this.props.deployments} refreshDeployments={this.props.initVirtualServiceDeploymentDropdownList} matchOptions={MatchOptions}
                        refreshGatewaies={this.props.initVirtualServiceGatewayDropdownList} refreshServices={this.props.initVirtualServiceServiceDropdownList}
                        reload={this.props.initVirtualServicePage} create={this.props.createVirtualService} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.virtualServices}
                        renderItem={(item: VirtualService) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteVirtualService({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
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
                                            <Descriptions size='small' column={1} bordered>
                                                {item.hosts.map((alias, index) => {
                                                    return <Descriptions.Item key={'alias' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Host' id="Label.HostItem" values={{ key: index }} />}>{alias}</Descriptions.Item>
                                                })}
                                                {item.gateways.map((gateArea, index) => {
                                                    return <Descriptions.Item key={'gateArea' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Gateway' id="Label.GatewayItem" values={{ key: index }} />}>{gateArea}</Descriptions.Item>
                                                })}
                                                {item.https.map((guideboard, index) => {
                                                    return <Descriptions.Item key={'guideboard' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Match' id="Label.HttpItem" values={{ key: index }} />}>
                                                        {guideboard.uris != null ? guideboard.uris.map((target, index) => {
                                                            return <p key={'target' + index}>{JSON.stringify(target)}</p>
                                                        }) : null}
                                                        {guideboard.headers != null ? guideboard.headers.map((tagTarget, index) => {
                                                            return <p key={'tagTarget' + index}>{JSON.stringify(tagTarget)}</p>
                                                        }) : null}
                                                        {guideboard.routes.map((direction, index) => {
                                                            return <p key={'direction' + index}>{direction.host} : {direction.subset ? direction.subset : direction.port}</p>
                                                        })}
                                                    </Descriptions.Item>
                                                })}
                                            </Descriptions>
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

const mapStateToProps = ({ virtualServicePage, masterPage, settingPage }: Store) => ({
    virtualServices: virtualServicePage.virtualServices,
    gateways: virtualServicePage.gateways,
    services: virtualServicePage.services,
    deployments: virtualServicePage.deployments,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initYardAreaPage,
    initNamespaceDropdownList,
    constructYardArea,
    demolishYardArea,
    initYardAreaGateAreaDropdownList,
    initYardAreaServiceDropdownList: initVirtualServiceServiceDropdownList,
    initVirtualServiceDeploymentDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(VirtualServicePage);