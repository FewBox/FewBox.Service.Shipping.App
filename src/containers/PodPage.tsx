import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, List, Layout, Tooltip, Menu, Dropdown, Tag, Popconfirm, Button, Descriptions, Badge, Popover, Collapse } from 'antd';
import { initPodPage, deletePod, createPod, initNamespaceDropdownList, showDrawer, initPodServiceAccountDropdownList } from '../actions';
import { Store, Pod, Namespace, ServiceAccount } from '../reducers/State';
import { Link } from 'react-router-dom';
import ShipBuilding from '../components/PodCreation';
import SubMenu from 'antd/lib/menu/SubMenu';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import { ImagePackagePolicyOptions } from '../jsons';

export interface IPodPageProps {
    namespaces: Namespace[];
    pods: Pod[];
    serviceAccounts: ServiceAccount[];
    showDrawer: () => void;
    initNamespaceDropdownList: () => void;
    initPodPage: () => void;
    deletePod: (any) => void;
    createPod: (any) => void;
    initPodServiceAccountDropdownList: (namespaceName: string) => void;
    isHelp: boolean;
}

class PodPage extends React.Component<IPodPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initPodPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <ShipBuilding isHelp={this.props.isHelp} imagePackagePolicyOptions={ImagePackagePolicyOptions} create={this.props.createPod} reload={this.props.initPodPage}
                        serviceAccounts={this.props.serviceAccounts} refreshServiceAccounts={this.props.initPodServiceAccountDropdownList} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.pods}
                        renderItem={(item: Pod) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deletePod({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Dropdown disabled={item.phase != 'Running'} overlay={<Menu>
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
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.App' id="Label.App" />}>{item.app}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Version' id="Label.Version" />}>{item.version}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Phase' id="Label.Phase" />}><Badge color={item.phase === 'Running' ? 'green' : 'red'} text={item.phase} /></Descriptions.Item>
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
                                                        return <Descriptions.Item key={'container' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Image' id="Label.ImageItem" values={{ key: index + 1 }} />}>{container}</Descriptions.Item>
                                                    })}
                                                    {item.volumes ? item.volumes.map((volume, index) => {
                                                        return <Descriptions.Item key={'volume' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Volume' id="Label.VolumeItem" values={{ key: volume.name }} />}>
                                                            <Popover title={volume.name} trigger="click" content={JSON.stringify(volume)}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    }) : null}
                                                    {item.volumeMounts ? item.volumeMounts.map((volumeMount, index) => {
                                                        return <Descriptions.Item key={'volumeMount' + index} label={<Badge color={volumeMount.isReadOnly ? 'red' : 'green'} text={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.VolumeMount' id="Label.VolumeMountItem" values={{ key: volumeMount.name }} />} />}>
                                                            <p>{volumeMount.mountPath}</p>
                                                            <p>{volumeMount.mountSubPath}</p>
                                                        </Descriptions.Item>
                                                    }) : null}
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

const mapStateToProps = ({ podPage, masterPage, settingPage }: Store) => ({
    pods: podPage.pods,
    serviceAccounts: podPage.serviceAccounts,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initPodPage,
    deletePod,
    createPod,
    showDrawer,
    initPodServiceAccountDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(PodPage);