import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Select, Input, Button } from 'antd';
import { ShippingLine } from '../../reducers/State';
import { ShippingLineIcon, BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';

export interface IYardAreaConstructionProps {
    shippingLines: ShippingLine[];
    construct: (string) => void;
    reload: () => void;
    form: any;
}

class YardAreaConstruction extends React.PureComponent<IYardAreaConstructionProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                //this.props.construct({});
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
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList keys='alias' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            {getFieldDecorator(`aliases[${k}]`, {
                                rules: [{ required: true, message: <FormattedMessage id='Message.AliasRequired' /> }],
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Alias" />
                            )}
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Alias" />} />
                <DynamicFieldList keys='gateArea' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            {getFieldDecorator(`gateAreas[${k}]`, {
                                rules: [{ required: true, message: <FormattedMessage id='Message.GateAreaRequired' /> }],
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Gate Area" />
                            )}
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.GateArea" />} />
                <DynamicFieldList keys='guideboard' itemComponents={(k) =>
                    [<Col offset={1} span={6} key={1}>
                        <Form.Item>
                            <DynamicFieldList keys='information' itemComponents={(k) =>
                                [<Col offset={1} key={1}>
                                    <Form.Item>
                                        {getFieldDecorator(`informations[${k}]`, {
                                            rules: [{ required: true, message: <FormattedMessage id='Message.InformationRequired' /> }],
                                        })(
                                            <Input.TextArea placeholder="Information" />
                                        )}
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Information" />} />
                            {/*<DynamicFieldList keys='direction' itemComponents={(k) =>
                                [<Col span={3} key={1}>
                                    <Form.Item>
                                        {getFieldDecorator(`directionQuayArea[${k}]`, {
                                            rules: [{ required: true, message: <FormattedMessage id='Message.QuayAreaRequired' /> }],
                                        })(
                                            <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Quay Area" />
                                        )}
                                    </Form.Item>
                                </Col>,
                                <Col span={3} key={1}>
                                    <Form.Item>
                                        {getFieldDecorator(`directionCrane[${k}]`, {
                                            rules: [{ required: true, message: <FormattedMessage id='Message.CraneRequired' /> }],
                                        })(
                                            <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Crane" />
                                        )}
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Crane" />} />*/}
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Guideboard" />} />
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

export default connect()(Form.create({ name: 'yardarea_construct' })(YardAreaConstruction));