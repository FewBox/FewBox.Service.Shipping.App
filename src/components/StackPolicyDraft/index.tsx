import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { StackPolicy, ShippingLine } from '../../reducers/State';
import { ShippingLineIcon } from '../Icon';
import { BrandIcon } from '../Icon';

export interface IStackPolicyDraftProps {
    stackPolicys: StackPolicy[];
    shippingLines: ShippingLine[];
    construct: (any) => void;
    form: any;
}

class StackPolicyDraft extends React.PureComponent<IStackPolicyDraftProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.construct({});
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
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
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('alias', {
                                rules: [{ required: true, message: 'Please input alias!' }],
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Alias" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('trafficPolicyMode', {
                                rules: [{ required: true, message: 'Please input traffic policy mode!' }],
                                initialValue: 0
                            })(
                                <Select showSearch placeholder="Traffic Policy Mode" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                    <Select.Option value={0}><FormattedMessage id='Label.Rent' /></Select.Option>
                                    <Select.Option value={1}><FormattedMessage id='Label.Own' /></Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item>
                                <Button type="primary" shape="circle" icon="plus" htmlType="submit" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default connect()(Form.create({ name: 'stackpolicy_draft' })(StackPolicyDraft));
