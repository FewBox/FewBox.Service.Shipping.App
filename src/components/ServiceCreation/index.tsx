import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { Namespace, Option } from '../../reducers/State';
import { QuayAreaIcon, BerthIcon, CraneIcon, CellGuideIcon, BrandIcon, } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IServiceCreationProps {
    serviceOptions: Option[];
    sessionAffinityOptions: Option[];
    namespaces: Namespace[];
    construct: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class ServiceCreation extends React.PureComponent<IServiceCreationProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let servicePorts = values.portNames ? values.portNames.map((portName, index) => {
                    let targetPort = parseInt(values.targetPorts[index]);
                    if (isNaN(targetPort)) {
                        targetPort = values.targetPorts[index];
                    }
                    return { name: portName, port: values.ports[index], targetPort: targetPort };
                }) : null;
                this.props.construct({ namespace: values.namespace, name: values.name, sessionAffinityType: values.sessionAffinityType, servicePorts: servicePorts, type: values.type });
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
                                <Input prefix={<QuayAreaIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.SessionAffinity" />}>
                                {getFieldDecorator('sessionAffinityType', {
                                    rules: [{
                                        required: true, message: <FormattedMessage id='Message.SessionAffinityRequired' />
                                    }],
                                    initialValue: 'None'
                                })(
                                    <Select showSearch placeholder={<FormattedMessage id='Label.SessionAffinity' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.sessionAffinityOptions.map((sessionAffinityOption, index) => {
                                            return <Select.Option key={'sessionAffinity' + index} value={sessionAffinityOption.value}>{sessionAffinityOption.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: <FormattedMessage id='Message.TypeRequired' /> }],
                                initialValue: 'ClusterIP'
                            })(
                                <Select showSearch placeholder={<FormattedMessage id='Label.Type' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                    {this.props.serviceOptions.map((serviceOption, index) => {
                                        return <Select.Option key={'service' + index} value={serviceOption.value}>{serviceOption.name}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='port' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.PortName" />}>
                                {getFieldDecorator(`portNames[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }],
                                })(
                                    <Input prefix={<BerthIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="PortName" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item >
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Port" />}>
                                {getFieldDecorator(`ports[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.Portequired' /> }],
                                })(
                                    <Input prefix={<CraneIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Port' />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={3}>
                        <Form.Item >
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.TargetPort" />}>
                                {getFieldDecorator(`targetPorts[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.TargetPortRequired' /> }],
                                })(
                                    <Input prefix={<CellGuideIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="TargetPort" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Port" />} />
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

export default connect()(Form.create({ name: 'service_creation' })(ServiceCreation));