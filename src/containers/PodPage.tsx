import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, List, Layout, Tooltip, Menu, Dropdown, Tag, Popconfirm, Button, Descriptions, Badge, Popover, Collapse } from 'antd';
import { initContainerShipPage, sinkContainerShip, constructTemporaryContainerShip, initNamespaceDropdownList, showDrawer, initContainerShipServiceAccountDropdownList } from '../actions';
import { Store, Pod, Namespace, ServiceAccount } from '../reducers/State';
import { Link } from 'react-router-dom';
import ShipBuilding from '../components/PodCreation';
import SubMenu from 'antd/lib/menu/SubMenu';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IPodPageProps {
    namespaces: Namespace[];
    containerShips: Pod[];
    serviceAccounts: ServiceAccount[];
    showDrawer: () => void;
    initNamespaceDropdownList: () => void;
    initContainerShipPage: () => void;
    sinkContainerShip: (any) => void;
    constructTemporaryContainerShip: (any) => void;
    initContainerShipServiceAccountDropdownList: (namespaceName: string) => void;
    isHelp: boolean;
}

class PodPage extends React.Component<IPodPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initContainerShipPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <ShipBuilding isHelp={this.props.isHelp} construct={this.props.constructTemporaryContainerShip} reload={this.props.initContainerShipPage}
                    serviceAccounts={this.props.serviceAccounts} refreshServiceAccounts={this.props.initContainerShipServiceAccountDropdownList} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.containerShips}
                        renderItem={(item: Pod) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.sinkContainerShip({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Dropdown disabled={item.status != 'Running'} overlay={<Menu>
                                        {item.containers.map((container, index) => {
                                            return <SubMenu key={'contianer-shell' + index} title={container}>
                                                <Menu.Item>
                                                    <Link to={_.template('/master/terminal/<%= namespace %>/<%= pod %>/<%= container %>/<%= command %>')({ 'pod': item.name, 'namespace': item.namespace, 'container': container, 'command': btoa('/bin/bash') })}>{<FormattedMessage id="Label.Bash" />}</Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link to={_.template('/master/terminal/<%= namespace %>/<%= pod %>/<%= container %>/<%= command %>')({ 'pod': item.name, 'namespace': item.namespace, 'container': container, 'command': btoa('/bin/sh') })}>{<FormattedMessage id="Label.Sh" />}</Link>
                                                </Menu.Item>
                                            </SubMenu>
                                        })}
                                    </Menu>}>
                                        <Icon type="code" />
                                    </Dropdown>,
                                    <Dropdown overlay={<Menu>
                                        <SubMenu title='Log'>
                                            {item.containers.map((container, index) => {
                                                return <Menu.Item key={'contianer-log' + index}>
                                                    <Link to={_.template('/master/logbook/<%= namespace %>/<%= pod %>/<%= container %>')({ 'pod': item.name, 'namespace': item.namespace, 'container': container })}>{container}</Link>
                                                </Menu.Item>
                                            })}
                                        </SubMenu>
                                        <SubMenu title='Normal'>
                                            <Menu.Item>
                                                <Button icon="more">Detail</Button>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Icon type="ellipsis" />
                                        </a>
                                    </Dropdown>
                                ]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                                <Descriptions size='small' column={1} bordered>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.App' id="Label.IdentificationCode" />}>{item.app}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Version' id="Label.Version" />}>{item.version}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Phase' id="Label.Status" />}><Badge color={item.status === 'Running' ? 'green' : 'red'} text={item.status} /></Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.ServiceAccount' id="Label.ServiceAccount" />}>{item.serviceAccount}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Node' id="Label.Node" />}>{item.node}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.NodeIP' id="Label.NodeIP" />}>{item.nodeIP}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.PodIP' id="Label.IP" />}>{item.ip}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                                                </Descriptions>
                                            </Collapse.Panel>
                                            <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                                <Descriptions size='small' column={1} bordered>
                                                    {item.containers.map((container, index) => {
                                                        return <Descriptions.Item key={'cargo' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Image' id="Label.ImageItem" values={{ key: index + 1 }} />}>{container}</Descriptions.Item>
                                                    })}
                                                    {item.volumns.map((document, index) => {
                                                        return <Descriptions.Item key={'document' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Volumn' id="Label.VolumeItem" values={{ key: document.name }} />}>
                                                            <Popover title={document.name} trigger="click" content={JSON.stringify(document)}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                    {item.volumnMounts.map((documentDefinition, index) => {
                                                        return <Descriptions.Item key={'documentDefinition' + index} label={<Badge color={documentDefinition.isReadOnly ? 'red' : 'green'} text={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.VolumnMount' id="Label.VolumeMountItem" values={{ key: documentDefinition.name }} />} />}>
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

const mapStateToProps = ({ podPage: containerShipPage, masterPage, settingPage }: Store) => ({
    containerShips: containerShipPage.pods,
    serviceAccounts: containerShipPage.serviceAccounts,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initContainerShipPage,
    sinkContainerShip,
    constructTemporaryContainerShip,
    showDrawer,
    initContainerShipServiceAccountDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(PodPage);