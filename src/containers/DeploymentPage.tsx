import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Row, List, Tooltip, Popconfirm, Icon, Tag, InputNumber, Descriptions, Popover, Button, Collapse, Badge } from 'antd';
import { initDeploymentPage, createDeployment, scalePodReplicas, deleteDeployment, initNamespaceDropdownList, showDrawer, initDeploymentServiceAccountDropdownList, initDeploymentSecretDropdownList } from '../actions';
import { Store, Deployment, Namespace, ServiceAccount, Secret } from '../reducers/State';
import DeploymentCreation from '../components/DeploymentCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import { ImagePullPolicyOptions, ProtocolOptions } from '../jsons';
import ResourcesCard from '../components/ResourcesCard';

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
                    <DeploymentCreation isHelp={this.props.isHelp} imagePullPolicyOptions={ImagePullPolicyOptions} protocolOptions={ProtocolOptions} create={this.props.createDeployment} reload={this.props.initDeploymentPage}
                        namespaces={this.props.namespaces} serviceAccounts={this.props.serviceAccounts} secrets={this.props.secrets}
                        refreshServiceAccounts={this.props.initDeploymentServiceAccountDropdownList} refreshSecrets={this.props.initDeploymentSecretDropdownList} />
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.deployments}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteDeployment({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                            <InputNumber size="small" min={1} max={10} defaultValue={item.replicas} onBlur={(value) => { this.props.scalePodReplicas({ namespace: item.namespace, name: item.name, replicas: value.target.value }); }} />,
                            <Icon type="ellipsis" onClick={() => this.props.showDrawer({ type: 'Deployment', namespace: item.namespace, name: item.name, images: item.images })} />]}
                        renderBasic={(item) => <Descriptions size='small' column={1} bordered>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.App" helpId="Help.App" />}>{item.app}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Version" helpId="Help.Version" />}>{item.version}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Replicas" helpId="Help.Replicas" />}>{item.replicas}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ServiceAccount" helpId="Help.ServiceAccount" />}>{item.serviceAccount}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                        renderMore={(item) => <Descriptions size='small' column={1} bordered>
                            {item.images.map((image, index) => {
                                return <Descriptions.Item key={'image' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ImageItem" helpId="Help.Image" values={{ key: index + 1 }} />}>
                                    <Popover title={<FormattedMessage id="Label.ImageItem" values={{ key: index + 1 }} />} trigger="click" content={image}>
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
    initDeploymentSecretDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentPage);