import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Row, List, Tooltip, Popconfirm, Icon, Tag, InputNumber, Descriptions, Popover, Button, Collapse, Badge, Dropdown, Menu } from 'antd';
import {
    initDeploymentPage, createDeployment, scalePodReplicas, deleteDeployment, initNamespaceDropdownList, showDrawer, initDeploymentServiceAccountDropdownList,
    initDeploymentSecretDropdownList, selectDeployment
} from '../actions';
import { Store, Deployment, Namespace, ServiceAccount, Secret, Container } from '../reducers/State';
import DeploymentCreation from '../components/DeploymentCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import { ImagePullPolicyOptions, ProtocolOptions } from '../jsons';
import ResourcesCard from '../components/ResourcesCard';
import ShowModule from '../util/ShowModule';

export interface IDeploymentPageProps {
    deployments: Deployment[];
    namespaces: Namespace[];
    serviceAccounts: ServiceAccount[];
    secrets: Secret[];
    initDeploymentPage: () => void;
    initNamespaceDropdownList: () => void;
    scalePodReplicas: (any) => void;
    createDeployment: (any) => void;
    deleteDeployment: (any) => void;
    showDrawer: (drawerType: any) => void;
    selectDeployment: (namespaceName: string, name: string) => void;
    initDeploymentServiceAccountDropdownList: (namespaceName: string) => void;
    initDeploymentSecretDropdownList: (namespaceName: string) => void;
    isHelp: boolean;
    isListLoading: boolean;
}

class DeploymentPage extends React.Component<IDeploymentPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initDeploymentPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    {ShowModule('M_Shipping_MODULEDEPLOYMENT_CUD') && <DeploymentCreation isHelp={this.props.isHelp} imagePullPolicyOptions={ImagePullPolicyOptions} protocolOptions={ProtocolOptions} create={this.props.createDeployment} reload={this.props.initDeploymentPage}
                        namespaces={this.props.namespaces} serviceAccounts={this.props.serviceAccounts} secrets={this.props.secrets}
                        refreshServiceAccounts={this.props.initDeploymentServiceAccountDropdownList} refreshSecrets={this.props.initDeploymentSecretDropdownList} />}
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.deployments}
                        renderActions={(item: Deployment) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteDeployment({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}>{ShowModule('M_Shipping_MODULEDEPLOYMENT_CUD') && <Icon type="delete" />}</Popconfirm>,
                            <InputNumber size="small" min={1} max={10} defaultValue={item.replicas} onBlur={(value) => { this.props.scalePodReplicas({ namespace: item.namespace, name: item.name, replicas: value.target.value }); }} />,
                            <Dropdown overlay={<Menu>
                                {ShowModule('M_Shipping_MODULEDEPLOYMENT_CUD') && <Menu.Item>
                                    <Button type="link" icon="setting" onClick={() => { this.props.selectDeployment(item.namespace, item.name); this.props.showDrawer({ type: 'Deployment', namespace: item.namespace, name: item.name }); }}></Button>
                                </Menu.Item>}
                            </Menu>}>
                                <a className="ant-dropdown-link">
                                    <Icon type="ellipsis" />
                                </a>
                            </Dropdown>]}
                        renderBasic={(item) => <Descriptions size='small' column={1}>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.App" helpId="Help.App" />}>{item.app}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Version" helpId="Help.Version" />}>{item.version}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Replicas" helpId="Help.Replicas" />}>{item.replicas}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ServiceAccount" helpId="Help.ServiceAccount" />}>{item.serviceAccount}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                        renderMore={(item) => <Descriptions size='small' column={1} bordered>
                            {item.containers.map((container: Container, index) => {
                                return <Descriptions.Item key={'image' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ContainerItem" helpId="Help.Container" values={{ key: index + 1 }} />}>
                                    <Tag color="lime">{container.imagePullPolicyType}</Tag>
                                    <Popover title={<FormattedMessage id="Label.ContainerItem" values={{ key: index + 1 }} />} trigger="click" content={container.image}>
                                        <Button type="primary" icon='eye'></Button>
                                    </Popover>
                                </Descriptions.Item>
                            })}
                            {item.volumes ? item.volumes.map((volume, index) => {
                                return <Descriptions.Item key={'volume' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.VolumeItem" helpId="Help.Volume" values={{ key: volume.name }} />}>
                                    <Popover title={volume.name} trigger="click" content={JSON.stringify(volume)}>
                                        <Button type="primary" icon='eye'></Button>
                                    </Popover>
                                </Descriptions.Item>
                            }) : null}
                            {item.volumeMounts ? item.volumeMounts.map((volumeMount, index) => {
                                return <Descriptions.Item key={'volumeMount' + index} label={<Badge color={volumeMount.isReadOnly ? 'red' : 'green'} text={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.VolumeMountItem" helpId="Help.VolumeMount" values={{ key: volumeMount.name }} />} />}>
                                    <p>{volumeMount.mountPath}</p>
                                    <p>{volumeMount.mountSubPath}</p>
                                </Descriptions.Item>
                            }) : null}
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ deploymentPage, masterPage, settingPage }: Store) => ({
    deployments: deploymentPage.items,
    isListLoading: deploymentPage.isListLoading,
    serviceAccounts: deploymentPage.serviceAccounts,
    secrets: deploymentPage.secrets,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initDeploymentPage,
    createDeployment,
    scalePodReplicas,
    deleteDeployment,
    showDrawer,
    initDeploymentServiceAccountDropdownList,
    initDeploymentSecretDropdownList,
    selectDeployment
};

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentPage);