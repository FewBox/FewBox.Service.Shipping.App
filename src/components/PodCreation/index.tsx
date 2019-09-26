import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, InputNumber, Switch } from 'antd';
import { Namespace, ServiceAccount, Option } from '../../reducers/State';
import { DeploymentIcon, VersionIcon, ImageIcon, SleepIcon, IstioIcon, DoorIcon, BrandIcon } from '../Icon';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';
import ServiceAccountDropdownList from '../ServiceAccountDropdownList';

export interface IPodCreationProps {
    imagePackagePolicyOptions: Option[];
    namespaces: Namespace[];
    serviceAccounts: ServiceAccount[];
    create: (any) => void;
    refreshServiceAccounts: (namespaceName: string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class PodCreation extends React.PureComponent<IPodCreationProps> {
    changeNamespace = (namespaceName: string) => {
        this.props.refreshServiceAccounts(namespaceName);
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let ports;
                if (values.ports && values.ports.length > 0) {
                    if (typeof (values.ports) == 'object') {
                        ports = values.ports.map((item, index) => {
                            let door = _.split(item, '|');
                            return { name: door[0], leaf: door[1] };
                        });
                    }
                    else {
                        let door = _.split(values.ports, '|');
                        ports = [{ name: door[0], leaf: door[1] }];
                    }
                }
                this.props.create({
                    namespace: values.namespace,
                    serviceAccount: values.serviceAccount,
                    name: values.name,
                    version: values.version,
                    replicas: values.replicas,
                    image: values.image,
                    imagePackagePolicy: values.imagePackagePolicy,
                    ports: ports,
                    isSleepInfinity: values.isSleepInfinity,
                    isIstioInjected: values.isIstioInjected
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
                                {getFieldDecorator('version', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.VersionRequired' /> }],
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
                                {getFieldDecorator('image', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ImageRequired' /> }],
                                })(
                                    <Input prefix={<ImageIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Image" />
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
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                {getFieldDecorator('ports', {
                                    initialValue: 'http|80'
                                })(
                                    <Select suffixIcon={<DoorIcon style={{ color: 'rgba(0,0,0,.25)' }} />} mode="tags" style={{ width: '100%' }} placeholder="Doors">
                                        <Select.Option value="http|80">http|80</Select.Option>
                                        <Select.Option value="https|443">https|443</Select.Option>
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Replica' />}>
                                {getFieldDecorator('replicas', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ReplicasRequired' /> }],
                                    initialValue: '2'
                                })(
                                    <InputNumber min={1} max={10} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.ImagePullPolicy' />}>
                                {getFieldDecorator('imagePackagePolicy', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ImagePackagePolicyRequired' /> }],
                                    initialValue: 'IfNotPresent'
                                })(
                                    <Select showSearch placeholder={<FormattedMessage id='Label.ImagePackagePolicy' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.imagePackagePolicyOptions.map((imagePackagePolicyOption, index) => {
                                            return <Select.Option key={'imagePackagePolicyOption' + index} value={imagePackagePolicyOption.value}>{imagePackagePolicyOption.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            {getFieldDecorator('isSleepInfinity', {
                                initialValue: false
                            })(
                                <Switch checkedChildren={<SleepIcon />} unCheckedChildren={<SleepIcon />} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            {getFieldDecorator('isIstioInjected', {
                                initialValue: true
                            })(
                                <Switch checkedChildren={<IstioIcon />} unCheckedChildren={<IstioIcon />} defaultChecked />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={3}>
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

export default connect()(Form.create({ name: 'pod_creation' })(PodCreation));