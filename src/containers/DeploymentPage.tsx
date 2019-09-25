import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Row, List, Tooltip, Popconfirm, Icon, Tag, InputNumber, Descriptions, Popover, Button, Collapse, Badge } from 'antd';
import { initShipyardPage, constructContainerShip, scaleContainerShipQuantity, scrapContainerShip, initNamespaceDropdownList, showDrawer, initShipyardCaptainDropdownList, initShipyardCredentialDropdownList } from '../actions';
import { Store, Shipyard, Namespace, Captain, Credential } from '../reducers/State';
import ShipyardConstruction from '../components/DeploymentCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IDeploymentPageProps {
    shipyards: Shipyard[];
    namespaces: Namespace[];
    captains: Captain[];
    credentials: Credential[];
    initShipyardPage: () => void;
    initNamespaceDropdownList: () => void;
    scaleContainerShipQuantity: (any) => void;
    constructContainerShip: (any) => void;
    scrapContainerShip: (any) => void;
    showDrawer: (drawerType: any) => void;
    initShipyardCaptainDropdownList: (namespaceName: string) => void;
    initShipyardCredentialDropdownList: (namespaceName: string) => void;
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
                        namespaces={this.props.namespaces} captains={this.props.captains} credentials={this.props.credentials}
                        refreshCaptains={this.props.initShipyardCaptainDropdownList} refreshCredentials={this.props.initShipyardCredentialDropdownList} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.shipyards}
                        renderItem={(item: Shipyard) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.scrapContainerShip({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <InputNumber size="small" min={1} max={10} defaultValue={item.quantity} onBlur={(value) => { this.props.scaleContainerShipQuantity({ namespace: item.namespace, name: item.name, quantity: value.target.value }); }} />,
                                    <Icon type="ellipsis" onClick={() => this.props.showDrawer({ type: 'Shipyard', namespace: item.namespace, name: item.name, cargos: item.cargos })} />]}>
                                    <Card.Meta title={item.name} description={
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                                <Descriptions size='small' column={1} bordered>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.IdentificationCode" helpId="Help.App" />}>{item.identificationCode}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Version" helpId="Help.Version" />}>{item.numbering}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Replica" helpId="Help.Replica" />}>{item.quantity}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ServiceAccount" helpId="Help.ServiceAccount" />}>{item.captain}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                                                </Descriptions>
                                            </Collapse.Panel>
                                            <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                                <Descriptions size='small' column={1} bordered>
                                                    {item.cargos.map((cargo, index) => {
                                                        return <Descriptions.Item key={'cargo' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ImageItem" helpId="Help.Image" values={{ key: index + 1 }} />}>
                                                            <Popover title={<FormattedMessage id="Label.ImageItem" values={{ key: index + 1 }} />} trigger="click" content={cargo}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                    {item.documents.map((document, index) => {
                                                        return <Descriptions.Item key={'document' + index} label={<HelpFormattedMessage  isHelp={this.props.isHelp} id="Label.VolumeItem" helpId="Help.Volume" values={{ key: document.name }} />}>
                                                            <Popover title={document.name} trigger="click" content={JSON.stringify(document)}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                    {item.documentDefinitions.map((documentDefinition, index) => {
                                                        return <Descriptions.Item key={'documentDefinition' + index} label={<Badge color={documentDefinition.isWaterMarked ? 'red' : 'green'} text={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.VolumeMountItem" helpId="Help.VolumeMount" values={{ key: documentDefinition.name }} />} />}>
                                                            <p>{documentDefinition.term}</p>
                                                            <p>{documentDefinition.subTerm}</p>
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

const mapStateToProps = ({ shipyardPage, masterPage, settingPage }: Store) => ({
    shipyards: shipyardPage.shipyards,
    captains: shipyardPage.captains,
    credentials: shipyardPage.credentials,
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
    initShipyardCaptainDropdownList,
    initShipyardCredentialDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentPage);