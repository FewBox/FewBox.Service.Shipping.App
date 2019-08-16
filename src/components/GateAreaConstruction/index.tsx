import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { ShippingLine, ChannelComponent } from '../../reducers/State';
import { autobind } from 'core-decorators';
import { ShippingLineIcon, GateAreaIcon, WarehouseIcon, GateIcon, NumberingIcon } from '../Icon';

export interface Spec {
    name: string;
    value: string;
}

export interface IGateAreaConstructionProps {
    channelComponents: ChannelComponent[];
    shippingLines: ShippingLine[];
    specs: Spec[];
    addChannelComponent: (number) => void;
    removeChannelComponent: (number) => void;
    construct: (string) => void;
    reload: () => void;
    form: any;
    intl: any;
}

class GateAreaConstruction extends React.PureComponent<IGateAreaConstructionProps> {
    @autobind
    addChannel() {
        this.props.addChannelComponent(this.props.channelComponents.length + 1);
    }
    removeChannel(index) {
        this.props.removeChannelComponent(index);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let channels = Object.keys(values).filter((k) => { return k.startsWith('gate-name'); }).map((k, index) => {
                    let elementIndex = k.substr('gate-name'.length);
                    let warehouses = values['warehouses' + elementIndex];
                    return { name: values[k], gate: { name: values['gate-name' + elementIndex], numbering: values['gate-numbering' + elementIndex], specification: values['gate-specification' + elementIndex] }, warehouses: warehouses };
                });
                this.props.construct({ shippingLine: values.shippingLine, name: values.name, channels: channels });
            }
        });
    };
    getRemoveComponent(index, lastIndex) {
        if (index == lastIndex) {
            return <Button icon="minus" onClick={() => { this.removeChannel(index); }} />;
        }
    }
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        var channelComponents = this.props.channelComponents.map((item, index) => {
            return <Row gutter={16} key={item.name + index}>
                <Col span={6}>
                    <Form.Item>
                        {getFieldDecorator('gate-name' + index, {
                            rules: [{ required: true, message: <FormattedMessage id='Message.GateRequired' /> }],
                        })(
                            <Input prefix={<GateIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={this.props.intl.formatMessage({ id: 'Label.Gate' })} />
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item >
                        {getFieldDecorator('gate-numbering' + index, {
                            rules: [{ required: true, message: 'Please input numbering!' }],
                        })(
                            <Input prefix={<NumberingIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numbering" />
                        )}
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item>
                        {getFieldDecorator('gate-specification' + index, {
                            rules: [{ required: true, message: 'Please input Specification!' }],
                            initialValue: 'http'
                        })(
                            <Select showSearch placeholder="Specification" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                {this.props.specs.map((item, index) => {
                                    return <Select.Option key={'specification' + index} value={item.value}>{item.name}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item>
                        {getFieldDecorator('warehouses' + index, {
                            rules: [{ required: true, message: 'Please input warehouses!' }],
                            initialValue: '*'
                        })(
                            <Select suffixIcon={<WarehouseIcon style={{ color: 'rgba(0,0,0,.25)' }} />} mode="tags" style={{ width: '100%' }} placeholder="Warehouses">
                                <Select.Option value="80">*</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item>
                        {this.getRemoveComponent(index, this.props.channelComponents.length - 1)}
                    </Form.Item>
                </Col>
            </Row>
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('shippingLine', {
                                rules: [{ required: true, message: 'Please input Shipping Line!' }],
                            })(
                                <Select showSearch placeholder="Shipping Line" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                    {this.props.shippingLines.map((item, index) => {
                                        return <Select.Option key={'shippingline' + index} value={item.name}>{item.name}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input name!' }],
                            })(
                                <Input prefix={<GateAreaIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                {channelComponents}
                <Row gutter={16}>
                    <Col span={24}>
                        <Button icon="plus" onClick={this.addChannel} />
                    </Col>
                </Row>
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

export default connect()(Form.create({ name: 'gatearea_construct' })(injectIntl(GateAreaConstruction)));