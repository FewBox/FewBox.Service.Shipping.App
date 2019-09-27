import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { Namespace, Option } from '../../reducers/State';
import { GatewayIcon, VersionIcon, BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IGatewayCreationProps {
    namespaces: Namespace[];
    protocolOptions: Option[];
    addChannelComponent: (number) => void;
    removeChannelComponent: (number) => void;
    create: (string) => void;
    reload: () => void;
    form: any;
    intl: any;
    isHelp: boolean;
}

class GatewayCreation extends React.PureComponent<IGatewayCreationProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let servers = values.portNames.map((portName, index) => {
                    let hosts;
                    if (values.hosts.length > 1) {
                        hosts = values.hosts[index];
                    }
                    else {
                        hosts = values.hosts;
                    }
                    return { port: { name: portName, number: values.portNumbers[index], protocol: values.portProtocols[index] }, hosts: hosts };
                });
                this.props.create({ namespace: values.namespace, name: values.name, servers: servers });
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
                                <Input prefix={<GatewayIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='port' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Server' />}>
                                {getFieldDecorator(`portNames[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.PortNameRequired' /> }],
                                })(
                                    <Input prefix={<GatewayIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.PortName' })} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item >
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                {getFieldDecorator(`portNumbers[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.PortNumberRequired' /> }],
                                })(
                                    <Input prefix={<VersionIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Port' })} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Protocol' />}>
                                {getFieldDecorator(`portProtocols[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.PortProtocolRequired' /> }],
                                    initialValue: 'Http'
                                })(
                                    <Select showSearch placeholder={<FormattedMessage id='Label.Protocol' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.protocolOptions.map((item, index) => {
                                            return <Select.Option key={'portProtocol' + index} value={item.value}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={4}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Host' />}>
                                {getFieldDecorator(`hosts[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.HostRequired' /> }],
                                    initialValue: '*'
                                })(
                                    <Select suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} mode="tags" style={{ width: '100%' }} placeholder={<FormattedMessage id='Label.Host' />}>
                                        <Select.Option value="*">*</Select.Option>
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    ]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Server" />} />
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

export default connect()(Form.create({ name: 'gateway_creation' })(injectIntl(GatewayCreation)));