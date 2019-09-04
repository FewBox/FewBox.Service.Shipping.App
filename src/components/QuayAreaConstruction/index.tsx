import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { ShippingLine } from '../../reducers/State';
import { autobind } from 'core-decorators';
import { ShippingLineIcon, QuayAreaIcon, BerthIcon, CraneIcon, CellGuideIcon, BrandIcon, } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import { Spec } from '../GateAreaConstruction';

export interface IQuayAreaConstructionProps {
    specs: Spec[];
    shippingLines: ShippingLine[];
    construct: (string) => void;
    reload: () => void;
    form: any;
}

class QuayAreaConstruction extends React.PureComponent<IQuayAreaConstructionProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let berths = values.berthNames ? values.berthNames.map((berthName, index) => {
                    let cellGuide = parseInt(values.berthCellGuides[index]);
                    if (isNaN(cellGuide)) {
                        cellGuide = values.berthCellGuides[index];
                    }
                    return { name: berthName, crane: values.berthCranes[index], cellGuide: cellGuide };
                }) : null;
                this.props.construct({ shippingLine: values.shippingLine, name: values.name, specificationType: values.specificationType, berths: berths, containerShipAgreementType: values.containerShipAgreementType });
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
                                <Input prefix={<QuayAreaIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('containerShipAgreementType', {
                                rules: [{ required: true, message: 'Please input fixed bitt type!' }],
                                initialValue: 0
                            })(
                                <Select showSearch placeholder="ContainerShip Agreement Type" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                    <Select.Option value={0}><FormattedMessage id='Label.Rent' /></Select.Option>
                                    <Select.Option value={1}><FormattedMessage id='Label.Own' /></Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            {getFieldDecorator('specificationType', {
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
                </Row>
                <DynamicFieldList keys='credential' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            {getFieldDecorator(`berthNames[${k}]`, {
                                rules: [{ required: true, message: <FormattedMessage id='Message.BerthRequired' /> }],
                            })(
                                <Input prefix={<BerthIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Berth" />
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item >
                            {getFieldDecorator(`berthCranes[${k}]`, {
                                rules: [{ required: true, message: 'Please input crane!' }],
                            })(
                                <Input prefix={<CraneIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Crane" />
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={3}>
                        <Form.Item >
                            {getFieldDecorator(`berthCellGuides[${k}]`, {
                                rules: [{ required: true, message: 'Please input cell guide!' }],
                            })(
                                <Input prefix={<CellGuideIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cell Guide" />
                            )}
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.AddQuayArea" />} />
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

export default connect()(Form.create({ name: 'quayarea_construct' })(QuayAreaConstruction));