import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, InputNumber, Switch } from 'antd';
import { ShippingLine, Captain } from '../../reducers/State';
import { ShipyardIcon, NumberingIcon, CargoIcon, SleepIcon, IstioIcon, ShippingLineIcon, DoorIcon, CaptainIcon } from '../Icon';
import HelpComponent from '../HelpComponent';

export interface IShipBuildingProps {
    shippingLines: ShippingLine[];
    captains: Captain[];
    construct: (any) => void;
    refreshCaptains: (shippingLine: string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class ShipBuilding extends React.PureComponent<IShipBuildingProps> {
    changeShippingLine = (shippingLine: string) => {
        this.props.refreshCaptains(shippingLine);
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let doors;
                if (values.doors && values.doors.length > 0) {
                    if (typeof (values.doors) == 'object') {
                        doors = values.doors.map((item, index) => {
                            let door = _.split(item, '|');
                            return { name: door[0], leaf: door[1] };
                        });
                    }
                    else {
                        let door = _.split(values.doors, '|');
                        doors = [{ name: door[0], leaf: door[1] }];
                    }
                }
                this.props.construct({
                    shippingLine: values.shippingLine,
                    captain: values.captain,
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
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Namespace' />}>
                                {getFieldDecorator('shippingLine', {
                                    rules: [{ required: true, message: 'Please input Shipping Line!' }],
                                })(
                                    <Select suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch placeholder="Shipping Line"
                                        onChange={this.changeShippingLine} optionFilterProp="children">
                                        {this.props.shippingLines.map((item, index) => {
                                            return <Select.Option key={'shippingline' + index} value={item.name}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
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
                                    rules: [{ required: true, message: 'Please input cargo!' }],
                                })(
                                    <Input prefix={<CargoIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cargo" />
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
                                    rules: [{ message: 'Please input captain!' }],
                                })(
                                    <Select suffixIcon={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch allowClear placeholder="Captain" optionFilterProp="children">
                                        {this.props.captains ? this.props.captains.map((item, index) => {
                                            return <Select.Option key={'captain' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                {getFieldDecorator('doors', {
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
                                {getFieldDecorator('quantity', {
                                    rules: [{ required: true, message: 'Please input quantity!' }],
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

export default connect()(Form.create({ name: 'shipyard_construction' })(ShipBuilding));