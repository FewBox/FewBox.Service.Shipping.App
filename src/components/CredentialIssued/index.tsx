import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { CaptainIcon, ShippingLineIcon } from '../Icon';
import { ShippingLine } from '../../reducers/State';
import { autobind } from 'core-decorators';
import DynamicFieldList from '../DynamicFieldList';

export interface ICredentialIssuedProps {
    shippingLines: ShippingLine[];
    issue: (string) => void;
    reload: () => void;
    form: any;
}

class CredentialIssued extends React.PureComponent<ICredentialIssuedProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let stamps = {};
                values.stampKeys ? values.stampKeys.map((stampKey, index) => {
                    stamps[stampKey] = btoa(values.stampContents[index]);
                }) : null;
                this.props.issue({ shippingLine: values.shippingLine, name: values.name.toLowerCase(), type: values.type, stamps: stamps });
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
                                <Input prefix={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: 'Please input type!' }],
                            })(
                                <Input prefix={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Type" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='credential' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            {getFieldDecorator(`stampKeys[${k}]`, {
                                rules: [{ required: true, message: 'Please input key!' }],
                            })(
                                <Input prefix={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Key" />
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={12} key={2}>
                        <Form.Item>
                            {getFieldDecorator(`stampContents[${k}]`, {
                                rules: [{ required: true, message: 'Please input content!' }],
                            })(
                                <Input.TextArea rows={4} placeholder="Content" />
                            )}
                        </Form.Item>
                    </Col>
                    ]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.AddCredential" />} />
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

export default connect()(Form.create({ name: 'credential_issued' })(CredentialIssued));