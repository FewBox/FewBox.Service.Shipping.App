import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { CaptainIcon, ShippingLineIcon } from '../Icon';
import { ShippingLine } from '../../reducers/State';
import HelpComponent from '../HelpComponent';

export interface ICaptainTrainingProps {
    shippingLines: ShippingLine[];
    train: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class CaptainTraining extends React.PureComponent<ICaptainTrainingProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.train({ shippingLine: values.shippingLine, name: values.name.toLowerCase() });
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
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Namespace" />}><Select suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch placeholder="Shipping Line" optionFilterProp="children">
                                    {this.props.shippingLines.map((item, index) => {
                                        return <Select.Option key={'shippingline' + index} value={item.name}>{item.name}</Select.Option>
                                    })}
                                </Select></HelpComponent>
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
                            <Button type="primary" shape="circle" icon="plus" htmlType="submit" />
                            <Button type="primary" shape="circle" icon="reload" style={{ marginLeft: 8 }} onClick={this.props.reload} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default connect()(Form.create({ name: 'captain_training' })(CaptainTraining));