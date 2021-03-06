import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, InputNumber, Switch } from 'antd';
import { Namespace, ServiceAccount, Secret, Option } from '../../reducers/State';
import { DeploymentIcon, VersionIcon, ContainerIcon, DoorIcon, ImagePullPolicyIcon, BrandIcon, SecretIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';
import ServiceAccountDropdownList from '../ServiceAccountDropdownList';
import { RegistryType } from '../../reducers/RegistryType';

export interface IDeploymentCreationProps {
    protocolOptions: Option[];
    imagePullPolicyOptions: Option[];
    namespaces: Namespace[];
    serviceAccounts: ServiceAccount[];
    secrets: Secret[];
    switchDockerRegistry: (registryType: string) => void;
    refreshServiceAccounts: (namespaceName: string) => void;
    refreshSecrets: (namespaceName: string) => void;
    refreshSelfImages: () => void;
    refreshHubImages: (hubNamespace: string) => void;
    refreshSelfVersions: (image: string) => void;
    refreshHubVersions: (image: string) => void;
    create: (any) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
    registryType: RegistryType;
    images: string[];
    versions: string[];
}

class DeploymentCreation extends React.PureComponent<IDeploymentCreationProps> {
    changeRegistry = (registryType) => {
        this.props.switchDockerRegistry(registryType);
        if (registryType == RegistryType.Self) {
            this.props.refreshSelfImages();
        }
    };
    changeNamespace = (namespaceName) => {
        this.props.refreshServiceAccounts(namespaceName);
        this.props.refreshSecrets(namespaceName);
    };
    changeHubNamespace = (e) => {
        this.props.refreshHubImages(e.target.value);
    };
    changeSelfImage = (image: string) => {
        this.props.refreshSelfVersions(image);
    };
    changeHubImage = (image: string) => {
        this.props.refreshHubVersions(image);
    };
    validateNumbering = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (!value || (value.indexOf(':') != -1 && value.indexOf(':5000') != -1)) {
            callback();
        }
        else if (value.indexOf(':') == -1) {
            callback();
        }
        callback('Please remove the version.');
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let ports = values.ports ? values.ports.map((port, index) => {
                    return { containerPort: port };
                }) : null;
                let Volumes = values.volumes ? values.volumes.map((volume, index) => {
                    return { name: volume, secret: { secretName: values.secretKeys[index] } };
                }) : null;
                let volumeMounts = values.volumes ? values.volumes.map((volume, index) => {
                    return {
                        name: volume,
                        mountPath: values.mountPathes[index],
                        subPath: values.mountSubPathes ? values.mountSubPathes[index] : null,
                        readOnly: values.readonlies[index]
                    };
                }) : null;
                this.props.create({
                    namespace: values.namespace,
                    name: values.name,
                    serviceAccount: values.serviceAccount,
                    version: values.version,
                    replicas: values.replicas,
                    image: values.image,
                    imagePullPolicy: values.imagePullPolicy,
                    ports: ports,
                    Volumes: Volumes,
                    volumeMounts: volumeMounts
                });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        let namespaceComponent;
        let imageComponent;
        let versionComponent;
        if (this.props.registryType == RegistryType.Self) {
            imageComponent = getFieldDecorator('image', {
                rules: [{ required: true, message: <FormattedMessage id='Message.ImageRequired' /> }, { validator: this.validateNumbering }],
            })(<Select showSearch placeholder={<FormattedMessage id='Label.Image' />} optionFilterProp="children" onChange={this.changeSelfImage}
                filterOption={(input, option) =>
                    option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.props.images ? this.props.images.map((image, index) => {
                    return <Select.Option key={`image${index}`} value={image}>{image}</Select.Option>
                }) : null}
            </Select>);
            versionComponent = getFieldDecorator('version', {
                rules: [{ required: true, message: <FormattedMessage id='Message.VersionRequired' /> }],
            })(<Select showSearch placeholder={<FormattedMessage id='Label.Version' />} optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.props.versions ? this.props.versions.map((version, index) => {
                    return <Select.Option key={`version${index}`} value={version}>{version}</Select.Option>
                }) : null}
            </Select>);
        }
        else if (this.props.registryType == RegistryType.Hub) {
            namespaceComponent = <Col span={3}>
                <Form.Item>
                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Namespace" onPressEnter={this.changeHubNamespace} />
                </Form.Item>
            </Col>;
            imageComponent = getFieldDecorator('image', {
                rules: [{ required: true, message: <FormattedMessage id='Message.ImageRequired' /> }, { validator: this.validateNumbering }],
            })(<Select showSearch placeholder={<FormattedMessage id='Label.Image' />} optionFilterProp="children" onChange={this.changeHubImage}
                filterOption={(input, option) =>
                    option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.props.images ? this.props.images.map((image, index) => {
                    return <Select.Option key={`image${index}`} value={image}>{image}</Select.Option>
                }) : null}
            </Select>);
            versionComponent = getFieldDecorator('version', {
                rules: [{ required: true, message: <FormattedMessage id='Message.VersionRequired' /> }],
            })(<Select showSearch placeholder={<FormattedMessage id='Label.Version' />} optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.props.versions ? this.props.versions.map((version, index) => {
                    return <Select.Option key={`version${index}`} value={version}>{version}</Select.Option>
                }) : null}
            </Select>);
        }
        else {
            imageComponent = getFieldDecorator('image', {
                rules: [{ required: true, message: <FormattedMessage id='Message.ImageRequired' /> }, { validator: this.validateNumbering }],
            })(
                <Input prefix={<ContainerIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Image" />
            );
            versionComponent = getFieldDecorator('version', {
                rules: [{ required: true, message: <FormattedMessage id='Message.VersionRequired' /> }]
            })(
                <Input prefix={<VersionIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numbering" />
            );
        }
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <NamespaceDropdownList onChange={this.changeNamespace} isHelp={this.props.isHelp} form={this.props.form} namespaces={this.props.namespaces} />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }],
                            })(
                                <Input prefix={<DeploymentIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <Select placeholder={<FormattedMessage id='Label.DockerRegistryType' />} onChange={this.changeRegistry} defaultValue={this.props.registryType} >
                                <Select.Option value={1}><FormattedMessage id='Label.DockerRegistryType_Hub' /></Select.Option>
                                <Select.Option value={2}><FormattedMessage id='Label.DockerRegistryType_Self' /></Select.Option>
                                <Select.Option value={3}><FormattedMessage id='Label.DockerRegistryType_None' /></Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    {namespaceComponent}
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Image' />}>
                                {imageComponent}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Version' />}>
                                {versionComponent}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <ServiceAccountDropdownList isHelp={this.props.isHelp} serviceAccounts={this.props.serviceAccounts} form={this.props.form} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.ImagePullPolicy' />}>
                                {getFieldDecorator('imagePullPolicy', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ImagePullPolicyRequired' /> }],
                                    initialValue: 'IfNotPresent'
                                })(
                                    <Select suffixIcon={<ImagePullPolicyIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.imagePullPolicyOptions.map((imagePullPolicyOption, index) => {
                                            return <Select.Option key={'imagePullPolicyOption' + index} value={imagePullPolicyOption.value}>{imagePullPolicyOption.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Replicas' />}>
                                {getFieldDecorator('replicas', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ReplicasRequired' /> }],
                                    initialValue: '2'
                                })(
                                    <InputNumber min={1} max={10} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='containerPort' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                {getFieldDecorator(`ports[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.PortRequired' /> }],
                                    initialValue: 80
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Port" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Port" />} />
                <DynamicFieldList fieldName='secret' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.SecretName' />}>
                                {getFieldDecorator(`volumes[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.VolumeRequired' /> }]
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.SecretKey' />}>
                                {getFieldDecorator(`secretKeys[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.SecretRequired' /> }],
                                })(
                                    <Select suffixIcon={<SecretIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch placeholder={<FormattedMessage id='Label.Secret' />} optionFilterProp="children">
                                        {this.props.secrets ? this.props.secrets.map((item, index) => {
                                            return <Select.Option key={'secretKey' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.MountPath' />}>
                                {getFieldDecorator(`mountPathes[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.MountPathRequired' /> }]
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="MountPath" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={4}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.MountSubPath' />}>
                                {getFieldDecorator(`mountSubPathes[${k}]`, {
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="MountSubPath" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={2} key={5}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.ReadOnly' />}>
                                {getFieldDecorator(`readonlies[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ReadOnlyRequired' /> }],
                                    initialValue: true
                                })(
                                    <Switch checkedChildren={<BrandIcon />} unCheckedChildren={<BrandIcon />} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Secret" />} />
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <Button type="primary" shape="circle" icon="plus" htmlType="submit" />
                            <Button type="primary" shape="circle" icon="reload" style={{ marginLeft: 8 }} onClick={this.props.reload} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default connect()(Form.create({ name: 'deployment_creation' })(DeploymentCreation));