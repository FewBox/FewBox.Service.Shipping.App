import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { MooringComponent, ShippingLine } from '../../reducers/State';
import { autobind } from 'core-decorators';
import { PileIcon, BuoyIcon, PendantIcon } from '../Icon';

export interface ICustomConstructionProps {
    mooringComponents: MooringComponent[];
    shippingLines: ShippingLine[];
    addMooringComponent: (number) => void;
    removeMooringComponent: (number) => void;
    build: (string) => void;
    reload: () => void;
    form: any;
}

class CustomConstruction extends React.PureComponent<ICustomConstructionProps> {
    @autobind
    addMooring() {
        this.props.addMooringComponent(this.props.mooringComponents.length + 1);
    }
    removeMooring(index) {
        this.props.removeMooringComponent(index);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let moorings = Object.keys(values).filter((k) => { return k.startsWith('mooring-pile'); }).map((k, index) => {
                    let elementIndex = k.substr('mooring-pile'.length);
                    return { name: values[k], buoy: values['mooring-buoy' + elementIndex], pendant: values['mooring-pendant' + elementIndex] };
                });
                this.props.build({ shippingLine: values.shippingLine, name: values.name, moorings: moorings });
            }
        });
    };
    getRemoveComponent(index, lastIndex) {
        if (index == lastIndex) {
            return <Button icon="minus" onClick={() => { this.removeMooring(index); }} />;
        }
    }
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        var mooringComponents = this.props.mooringComponents.map((item, index) => {
            return <Row gutter={16} key={item.name + index}>
                <Col span={6}>
                    <Form.Item>
                        {getFieldDecorator('mooring-pile' + index, {
                            rules: [{ required: true, message: 'Please input pile!' }],
                        })(
                            <Input prefix={<PileIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Pile" />
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item >
                        {getFieldDecorator('mooring-buoy' + index, {
                            rules: [{ required: true, message: 'Please input buoy!' }],
                        })(
                            <Input prefix={<BuoyIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Buoy" />
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item >
                        {getFieldDecorator('mooring-pendant' + index, {
                            rules: [{ required: true, message: 'Please input pendant!' }],
                        })(
                            <Input prefix={<PendantIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Pendant" />
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    {this.getRemoveComponent(index, this.props.mooringComponents.length - 1)}
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
                                <Select showSearch placeholder="Shipping Line" optionFilterProp="children">
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
                                <Input prefix={<DockSetupIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                {mooringComponents}
                <Row gutter={16}>
                    <Col span={24}>
                        <Button icon="plus" onClick={this.addMooring} />
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

export default connect()(Form.create({ name: 'dock_build' })(CustomConstruction));