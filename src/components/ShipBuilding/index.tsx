import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, InputNumber, Switch } from 'antd';
import { ShippingLine } from '../../reducers/State';
import { ShipyardIcon, NumberingIcon, CargoIcon, SleepIcon, IstioIcon, ShippingLineIcon } from '../Icon';

export interface IShipBuildingProps {
    shippingLines: ShippingLine[];
    construct: (any) => void;
    reload: () => void;
    form: any;
}

class ShipBuilding extends React.PureComponent<IShipBuildingProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let doors;
                if (typeof (values.doors) == 'object') {
                    doors = values.doors.map((item, index) => {
                        return { number: item };
                    });
                }
                else {
                    doors = [{ leaf: values.doors }];
                }
                this.props.construct({
                    shippingLine: values.shippingLine,
                    name: values.name,
                    numbering: values.numbering,
                    quantity: values.quantity,
                    cargo: values.cargo,
                    cargoPackagePolicy: values.cargoPackagePolicy,
                    doors: doors,
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
                            {getFieldDecorator('shippingLine', {
                                rules: [{ required: true, message: 'Please input Shipping Line!' }],
                            })(
                                <Select suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch placeholder="Shipping Line" optionFilterProp="children">
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
                                <Input prefix={<ShipyardIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('numbering', {
                                rules: [{ required: true, message: 'Please input numbering!' }],
                                initialValue: 'latest'
                            })(
                                <Input prefix={<NumberingIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numbering" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('cargo', {
                                rules: [{ required: true, message: 'Please input cargo!' }],
                            })(
                                <Input prefix={<CargoIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cargo" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('cargoPackagePolicy', {
                                rules: [{ required: true, message: 'Please input cargo package policy!' }],
                                initialValue: '1'
                            })(
                                <Select>
                                    <Select.Option value="1">IfNotPresent</Select.Option>
                                    <Select.Option value="2">Always</Select.Option>
                                    <Select.Option value="3">Never</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('doors', {
                                rules: [{ required: false, message: 'Please input doors!' }],
                                initialValue: '80'
                            })(
                                <Select mode="tags" style={{ width: '100%' }} placeholder="Locking Rods">
                                    <Select.Option value="80">80</Select.Option>
                                    <Select.Option value="443">443</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            {getFieldDecorator('quantity', {
                                rules: [{ required: true, message: 'Please input quantity!' }],
                                initialValue: '2'
                            })(
                                <InputNumber min={1} max={10} />
                            )}
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

export default connect()(Form.create({ name: 'shipyard_construction' })(ShipBuilding));