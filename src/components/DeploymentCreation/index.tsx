import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, InputNumber, Switch } from 'antd';
import { Namespace, Captain, Credential } from '../../reducers/State';
import { ShipyardIcon, NumberingIcon, ContainerIcon, DoorIcon, CargoPackagePolicyIcon, CaptainIcon, BrandIcon, CredentialIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IDeploymentCreationProps {
    namespaces: Namespace[];
    captains: Captain[];
    credentials: Credential[];
    refreshCaptains: (namespaceName: string) => void;
    refreshCredentials: (namespaceName: string) => void;
    construct: (any) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class DeploymentCreation extends React.PureComponent<IDeploymentCreationProps> {
    changeNamespace = (namespaceName: string) => {
        this.props.refreshCaptains(namespaceName);
        this.props.refreshCredentials(namespaceName);
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

                let documentCredentials = values.documentNames ? values.documentNames.map((documentName, index) => {
                    return { name: documentName, secret: { secretName: values.documentCredentialNames[index] } };
                }) : null;
                let documentCredentialDefinitions = values.documentNames ? values.documentNames.map((documentName, index) => {
                    return {
                        name: documentName, term: values.documentCredentialTerms[index],
                        subTerm: values.documentCredentialSubTerms ? values.documentCredentialSubTerms[index] : null,
                        isWaterMarked: values.documentCredentialIsWaterMarkeds[index]
                    };
                }) : null;
                let documents = documentCredentials;
                let documentDefinitions = documentCredentialDefinitions;
                this.props.construct({
                    namespace: values.namespace,
                    name: values.name,
                    captain: values.captain,
                    numbering: values.numbering,
                    quantity: values.quantity,
                    cargo: values.cargo,
                    cargoPackagePolicy: values.cargoPackagePolicy,
                    doors: doors,
                    documents: documents,
                    documentDefinitions: documentDefinitions
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
                            <NamespaceDropdownList isHelp={this.props.isHelp} getFieldDecorator={getFieldDecorator} namespaces={this.props.namespaces} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input name!' }],
                            })(
                                <Input prefix={<ShipyardIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
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
                                    <Input prefix={<NumberingIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numbering" />
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
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.ServiceAccount' />}>
                                {getFieldDecorator('captain', {
                                    rules: [{ required: true, message: 'Please input captain!' }],
                                })(
                                    <Select suffixIcon={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch placeholder="Captain" optionFilterProp="children">
                                        {this.props.captains.map((item, index) => {
                                            return <Select.Option key={'captain' + index} value={item.name}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.ImagePullPolicy' />}>
                                {getFieldDecorator('cargoPackagePolicy', {
                                    rules: [{ required: true, message: 'Please input cargo package policy!' }],
                                    initialValue: '0'
                                })(
                                    <Select suffixIcon={<CargoPackagePolicyIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
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
                <DynamicFieldList fieldName='credential' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.SecretName' />}>
                                {getFieldDecorator(`documentNames[${k}]`, {
                                    rules: [{ required: true, message: 'Please input name!' }]
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.SecretKey' />}>
                                {getFieldDecorator(`documentCredentialNames[${k}]`, {
                                    rules: [{ required: true, message: 'Please input credential!' }],
                                })(
                                    <Select suffixIcon={<CredentialIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch placeholder="Credential" optionFilterProp="children">
                                        {this.props.credentials ? this.props.credentials.map((item, index) => {
                                            return <Select.Option key={'credential' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.MountPath' />}>
                                {getFieldDecorator(`documentCredentialTerms[${k}]`, {
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
                                {getFieldDecorator(`documentCredentialSubTerms[${k}]`, {
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="SubTerm" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={2} key={5}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.IsReadOnly' />}>
                                {getFieldDecorator(`documentCredentialIsWaterMarkeds[${k}]`, {
                                    rules: [{ required: true, message: 'Please input name!' }],
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

export default connect()(Form.create({ name: 'shipyard_construction' })(DeploymentCreation));