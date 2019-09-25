import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Row, List, Tooltip, Popconfirm, Icon, Tag, InputNumber, Descriptions, Popover, Button, Collapse, Badge } from 'antd';
import { initShipyardPage, constructContainerShip, scaleContainerShipQuantity, scrapContainerShip, initNamespaceDropdownList, showDrawer, initShipyardServiceAccountDropdownList, initShipyardSecretDropdownList } from '../actions';
import { Store, Deployment, Namespace, ServiceAccount, Secret } from '../reducers/State';
import ShipyardConstruction from '../components/DeploymentCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IDeploymentPageProps {
    shipyards: Deployment[];
    namespaces: Namespace[];
    serviceAccounts: ServiceAccount[];
    secrets: Secret[];
    initShipyardPage: () => void;
    initNamespaceDropdownList: () => void;
    scaleContainerShipQuantity: (any) => void;
    constructContainerShip: (any) => void;
    scrapContainerShip: (any) => void;
    showDrawer: (drawerType: any) => void;
    initShipyardServiceAccountDropdownList: (namespaceName: string) => void;
    initShipyardSecretDropdownList: (namespaceName: string) => void;
    isHelp: boolean;
}

class DeploymentPage extends React.Component<IDeploymentPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initShipyardPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <ShipyardConstruction isHelp={this.props.isHelp} construct={this.props.constructContainerShip} reload={this.props.initShipyardPage}
                        namespaces={this.props.namespaces} serviceAccounts={this.props.serviceAccounts} secrets={this.props.secrets}
                        refreshServiceAccounts={this.props.initShipyardServiceAccountDropdownList} refreshSecrets={this.props.initShipyardSecretDropdownList} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.shipyards}
                        renderItem={(item: Deployment) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.scrapContainerShip({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <InputNumber size="small" min={1} max={10} defaultValue={item.replias} onBlur={(value) => { this.props.scaleContainerShipQuantity({ namespace: item.namespace, name: item.name, quantity: value.target.value }); }} />,
                                    <Icon type="ellipsis" onClick={() => this.props.showDrawer({ type: 'Shipyard', namespace: item.namespace, name: item.name, cargos: item.images })} />]}>
                                    <Card.Meta title={item.name} description={
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                                <Descriptions size='small' column={1} bordered>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.IdentificationCode" helpId="Help.App" />}>{item.app}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Version" helpId="Help.Version" />}>{item.version}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Replica" helpId="Help.Replica" />}>{item.replias}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ServiceAccount" helpId="Help.ServiceAccount" />}>{item.serviceAccount}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                                                </Descriptions>
                                            </Collapse.Panel>
                                            <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                                <Descriptions size='small' column={1} bordered>
                                                    {item.images.map((cargo, index) => {
                                                        return <Descriptions.Item key={'cargo' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ImageItem" helpId="Help.Image" values={{ key: index + 1 }} />}>
                                                            <Popover title={<FormattedMessage id="Label.ImageItem" values={{ key: index + 1 }} />} trigger="click" content={cargo}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                    {item.volumns.map((document, index) => {
                                                        return <Descriptions.Item key={'document' + index} label={<HelpFormattedMessage  isHelp={this.props.isHelp} id="Label.VolumeItem" helpId="Help.Volume" values={{ key: document.name }} />}>
                                                            <Popover title={document.name} trigger="click" content={JSON.stringify(document)}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                    {item.volumnMounts.map((documentDefinition, index) => {
                                                        return <Descriptions.Item key={'documentDefinition' + index} label={<Badge color={documentDefinition.isReadOnly ? 'red' : 'green'} text={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.VolumeMountItem" helpId="Help.VolumeMount" values={{ key: documentDefinition.name }} />} />}>
                                                            <p>{documentDefinition.mountPath}</p>
                                                            <p>{documentDefinition.mountSubPath}</p>
                                                        </Descriptions.Item>
                                                    })}
                                                </Descriptions>
                                            </Collapse.Panel>
                                        </Collapse>
                                    } />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ deploymentPage: shipyardPage, masterPage, settingPage }: Store) => ({
    shipyards: shipyardPage.deployments,
    serviceAccounts: shipyardPage.serviceAccounts,
    secrets: shipyardPage.secrets,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initShipyardPage,
    constructContainerShip,
    scaleContainerShipQuantity,
    scrapContainerShip,
    showDrawer,
    initShipyardServiceAccountDropdownList,
    initShipyardSecretDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentPage);