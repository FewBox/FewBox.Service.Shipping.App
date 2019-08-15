import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { BerthComponent, ShippingLine } from '../../reducers/State';
import { autobind } from 'core-decorators';
import { ShippingLineIcon, CustomsIcon, BerthIcon, CraneIcon } from '../Icon';

export interface Spec {
    name: string;
    value: string;
}

export interface ICustomsConstructionProps {
    berthComponents: BerthComponent[];
    shippingLines: ShippingLine[];
    specs: Spec[];
    addBerthComponent: (number) => void;
    removeBerthComponent: (number) => void;
    construct: (string) => void;
    reload: () => void;
    form: any;
}

class CustomsConstruction extends React.PureComponent<ICustomsConstructionProps> {
    @autobind
    addBerth() {
        this.props.addBerthComponent(this.props.berthComponents.length + 1);
    }
    removeBerth(index) {
        this.props.removeBerthComponent(index);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let berths = Object.keys(values).filter((k) => { return k.startsWith('berth-name'); }).map((k, index) => {
                    let elementIndex = k.substr('berth-name'.length);
                    return { name: values[k], buoy: values['berth-buoy' + elementIndex], pendant: values['berth-pendant' + elementIndex] };
                });
                this.props.construct({ shippingLine: values.shippingLine, name: values.name, berths: berths });
            }
        });
    };
    getRemoveComponent(index, lastIndex) {
        if (index == lastIndex) {
            return <Button icon="minus" onClick={() => { this.removeBerth(index); }} />;
        }
    }
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        var berthComponents = this.props.berthComponents.map((item, index) => {
            return <Row gutter={16} key={item.name + index}>
                <Col span={6}>
                    <Form.Item>
                        {getFieldDecorator('berth-name' + index, {
                            rules: [{ required: true, message: 'Please input berth!' }],
                        })(
                            <Input prefix={<BerthIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item >
                        {getFieldDecorator('berth-crane' + index, {
                            rules: [{ required: true, message: 'Please input crane!' }],
                        })(
                            <Input prefix={<CraneIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Crane" />
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item>
                        {getFieldDecorator('berth-spec', {
                            rules: [{ required: true, message: 'Please input Spec!' }],
                        })(
                            <Select showSearch placeholder="Spec" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                {this.props.specs.map((item, index) => {
                                    return <Select.Option key={'spec' + index} value={item.value}>{item.name}</Select.Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item>
                        {this.getRemoveComponent(index, this.props.berthComponents.length - 1)}
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
                                <Input prefix={<CustomsIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                {berthComponents}
                <Row gutter={16}>
                    <Col span={24}>
                        <Button icon="plus" onClick={this.addBerth} />
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

export default connect()(Form.create({ name: 'customs_construct' })(CustomsConstruction));