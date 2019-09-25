import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { Namespace, Option } from '../../reducers/State';
import { GateAreaIcon, WarehouseIcon, GateIcon, NumberingIcon, BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IGatewayCreationProps {
    namespaces: Namespace[];
    protocols: Option[];
    addChannelComponent: (number) => void;
    removeChannelComponent: (number) => void;
    construct: (string) => void;
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
                let channels = Object.keys(values).filter((k) => { return k.startsWith('gate-name'); }).map((k, index) => {
                    let elementIndex = k.substr('gate-name'.length);
                    let warehouses = values['warehouses' + elementIndex];
                    return { name: values[k], gate: { name: values['gate-name' + elementIndex], numbering: values['gate-numbering' + elementIndex], specification: values['gate-specification' + elementIndex] }, warehouses: warehouses };
                });
                channels = values.gateNames.map((gateName, index) => {
                    let warehouses;
                    if (values.gateWarehouses.length > 1) {
                        warehouses = values.gateWarehouses[index];
                    }
                    else {
                        warehouses = values.gateWarehouses;
                    }
                    return { gate: { name: gateName, numbering: values.gateNumberings[index], specificationType: values.gateSpecifications[index] }, warehouses: warehouses };
                });
                this.props.construct({ namespace: values.namespace, name: values.name, channels: channels });
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
                                <Input prefix={<GateAreaIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='gate' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Server' />}>
                                {getFieldDecorator(`gateNames[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.GateRequired' /> }],
                                })(
                                    <Input prefix={<GateIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Gateway' })} />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item >
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                {getFieldDecorator(`gateNumberings[${k}]`, {
                                    rules: [{ required: true, message: 'Please input numbering!' }],
                                })(
                                    <Input prefix={<NumberingIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numbering" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={3}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Protocol' />}>
                                {getFieldDecorator(`gateSpecifications[${k}]`, {
                                    rules: [{ required: true, message: 'Please input Specification!' }],
                                    initialValue: 'http'
                                })(
                                    <Select showSearch placeholder="Specification" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.protocols.map((item, index) => {
                                            return <Select.Option key={'specification' + index} value={item.value}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={4}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Host' />}>
                                {getFieldDecorator(`gateWarehouses[${k}]`, {
                                    rules: [{ required: true, message: 'Please input warehouses!' }],
                                    initialValue: '*'
                                })(
                                    <Select suffixIcon={<WarehouseIcon style={{ color: 'rgba(0,0,0,.25)' }} />} mode="tags" style={{ width: '100%' }} placeholder="Warehouses">
                                        <Select.Option value="*">*</Select.Option>
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    ]
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

export default connect()(Form.create({ name: 'gatearea_construct' })(injectIntl(GatewayCreation)));