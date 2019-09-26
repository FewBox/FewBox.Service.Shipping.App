import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, InputNumber, Switch } from 'antd';
import { Namespace, ServiceAccount, Secret } from '../../reducers/State';
import { DeploymentIcon, VersionIcon, ContainerIcon, DoorIcon, ImagePackagePolicyIcon, BrandIcon, SecretIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';
import ServiceAccountDropdownList from '../ServiceAccountDropdownList';

export interface IDeploymentCreationProps {
    namespaces: Namespace[];
    serviceAccounts: ServiceAccount[];
    secrets: Secret[];
    refreshServiceAccounts: (namespaceName: string) => void;
    refreshSecrets: (namespaceName: string) => void;
    construct: (any) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class DeploymentCreation extends React.PureComponent<IDeploymentCreationProps> {
    changeNamespace = (namespaceName: string) => {
        this.props.refreshServiceAccounts(namespaceName);
        this.props.refreshSecrets(namespaceName);
    };
    validateNumbering = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (value.indexOf(':') != -1) {
            callback('Please remove the numbering.')
        }
        callback()
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let doors = values.doorNames ? values.doorNames.map((doorName, index) => {
                    return { name: doorName, leaf: values.doorLeafs[index] };
                }) : null;

                let volumns = values.volumns ? values.volumns.map((volumn, index) => {
                    return { name: volumn, secret: { secretName: values.secretKeys[index] } };
                }) : null;
                let volumnMounts = values.volumns ? values.volumns.map((volumn, index) => {
                    return {
                        name: volumn, term: values.mountPathes[index],
                        subTerm: values.mountSubPathes ? values.mountSubPathes[index] : null,
                        isWaterMarked: values.isReadonlies[index]
                    };
                }) : null;
                this.props.construct({
                    namespace: values.namespace,
                    name: values.name,
                    serviceAccount: values.serviceAccount,
                    numbering: values.numbering,
                    quantity: values.quantity,
                    cargo: values.cargo,
                    cargoPackagePolicy: values.cargoPackagePolicy,
                    doors: doors,
                    volumns: volumns,
                    volumnMounts: volumnMounts
                });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <NamespaceDropdownList isHelp={this.props.isHelp} form={this.props.form} namespaces={this.props.namespaces} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }],
                            })(
                                <Input prefix={<DeploymentIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Version' />}>
                                {getFieldDecorator('numbering', {
                                    rules: [{ required: true, message: 'Please input numbering!' }],
                                    initialValue: 'latest'
                                })(
                                    <Input prefix={<VersionIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numbering" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Image' />}>
                                {getFieldDecorator('cargo', {
                                    rules: [{ required: true, message: 'Please input cargo!' }, { validator: this.validateNumbering }],
                                })(
                                    <Input prefix={<ContainerIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cargo" />
                                )}
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
                                {getFieldDecorator('cargoPackagePolicy', {
                                    rules: [{ required: true, message: 'Please input cargo package policy!' }],
                                    initialValue: '0'
                                })(
                                    <Select suffixIcon={<ImagePackagePolicyIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        <Select.Option value="0">IfNotPresent</Select.Option>
                                        <Select.Option value="1">Always</Select.Option>
                                        <Select.Option value="2">Never</Select.Option>
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Replica' />}>
                                {getFieldDecorator('quantity', {
                                    rules: [{ required: true, message: 'Please input quantity!' }],
                                    initialValue: '2'
                                })(
                                    <InputNumber min={1} max={10} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='door' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.PortName' />}>
                                {getFieldDecorator(`doorNames[${k}]`, {
                                    rules: [{ required: true, message: 'Please input door name!' }],
                                    initialValue: 'http'
                                })(
                                    <Select suffixIcon={<DoorIcon style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ width: '100%' }} placeholder="Door Name">
                                        <Select.Option value="http">http</Select.Option>
                                        <Select.Option value="https">https</Select.Option>
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={2}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                {getFieldDecorator(`doorLeafs[${k}]`, {
                                    rules: [{ required: true, message: 'Please input leaf!' }],
                                    initialValue: 80
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Leaf" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.ContainerPort" />} />
                <DynamicFieldList fieldName='secret' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.SecretName' />}>
                                {getFieldDecorator(`volumns[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }]
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
                                    rules: [{ required: true, message: 'Please input term!' }]
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Term" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={4}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.MountSubPath' />}>
                                {getFieldDecorator(`mountSubPathes[${k}]`, {
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="SubTerm" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={2} key={5}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.IsReadOnly' />}>
                                {getFieldDecorator(`isReadonlies[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }],
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