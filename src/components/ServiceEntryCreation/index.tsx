import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { Namespace, Option } from '../../reducers/State';
import { ServiceEntryIcon, GatewayIcon, VersionIcon, BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IServiceEntryCreationProps {
    namespaces: Namespace[];
    locationOptions: Option[];
    resolutionOptions: Option[];
    protocolOptions: Option[];
    addChannelComponent: (number) => void;
    removeChannelComponent: (number) => void;
    create: (string) => void;
    reload: () => void;
    form: any;
    intl: any;
    isHelp: boolean;
}

class ServiceEntryCreation extends React.PureComponent<IServiceEntryCreationProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let ports = values.portNames.map((portName, index) => {
                    return { name: portName, number: values.portNumbers[index], protocol: values.portProtocols[index] };
                });
                this.props.create({ namespace: values.namespace, name: values.name, location: values.location, resolution: values.resolution, hosts: values.hosts, positins: values.addresses, ports: ports });
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
                                <Input prefix={<ServiceEntryIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Location' />}>
                                {getFieldDecorator('location', {
                                    rules: [{ required: true, message: 'Please input Location!' }],
                                    initialValue: 'MESH_EXTERNAL'
                                })(
                                    <Select showSearch placeholder="Location" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.locationOptions.map((item, index) => {
                                            return <Select.Option key={'location' + index} value={item.value}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Resolution' />}>
                                {getFieldDecorator('resolution', {
                                    rules: [{ required: false, message: <FormattedMessage id='Message.ResolutionRequired' /> }]
                                })(
                                    <Select showSearch allowClear placeholder="Resolution" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.resolutionOptions.map((item, index) => {
                                            return <Select.Option key={'resolution' + index} value={item.value}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='host' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Host' />}>
                                {getFieldDecorator(`hosts[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.AliasRequired' /> }],
                                })(
                                    <Input prefix={<GatewayIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Host' })} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    ]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Host" />} />
                <DynamicFieldList fieldName='address' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Address' />}>
                                {getFieldDecorator(`addresses[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.PositionRequired' /> }],
                                })(
                                    <Input prefix={<GatewayIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.IP' })} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    ]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.IP" />} />
                <DynamicFieldList fieldName='port' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                {getFieldDecorator(`portNames[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.PortRequired' /> }],
                                })(
                                    <Input prefix={<GatewayIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Port' })} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item >
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.PortNumber' />}>
                                {getFieldDecorator(`portNumbers[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.PortNumberRequired' /> }],
                                })(
                                    <Input prefix={<VersionIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Number' })} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Protocol' />}>
                                {getFieldDecorator(`portProtocols[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ProtocolRequired' /> }],
                                    initialValue: 'HTTP'
                                })(
                                    <Select showSearch placeholder={<FormattedMessage id='Label.Protocol' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.protocolOptions.map((item, index) => {
                                            return <Select.Option key={'protocol' + index} value={item.value}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    ]
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

export default connect()(Form.create({ name: 'serviceentry_creation' })(injectIntl(ServiceEntryCreation)));