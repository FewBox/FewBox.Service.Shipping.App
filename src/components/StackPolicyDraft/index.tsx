import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { StackPolicy, ShippingLine, QuayArea, Shipyard } from '../../reducers/State';
import { ShippingLineIcon } from '../Icon';
import { BrandIcon } from '../Icon';
import DynamicFieldList from '../../../dist/src/components/DynamicFieldList';

export interface IStackPolicyDraftProps {
    stackPolicys: StackPolicy[];
    shippingLines: ShippingLine[];
    quayAreas: QuayArea[];
    shipyards: Shipyard[];
    refreshQuayAreas: (shippingLine: string) => void;
    refreshShipyards: (identificationCode: string) => void;
    draft: (any) => void;
    reload: () => void;
    form: any;
}

class StackPolicyDraft extends React.PureComponent<IStackPolicyDraftProps> {
    changeShippingLine = (shippingLine: string) => {
        this.props.refreshQuayAreas(shippingLine);
    };
    changeShipyard = (identificationCode: string) => {
        this.props.refreshShipyards(identificationCode);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let subsets = values.subsets.map((subset, index) => {
                    return { name: subset, labels: { version: subset } }
                });
                this.props.draft({ shippingLine: values.shippingLine, name: values.name, alias: values.alias, trafficPolicyMode: values.trafficPolicyMode, subsets: subsets });
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
                                    <Select showSearch onChange={this.changeShippingLine} placeholder="Shipping Line" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.shippingLines.map((item, index) => {
                                            return <Select.Option key={'shippingLine' + index} value={item.name}>{item.name}</Select.Option>
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
                                    rules: [{ required: true, message: <FormattedMessage id='Message.QuayAreaRequired' /> }],
                                })(
                                    <Select showSearch onChange={this.changeShipyard} placeholder="QuayArea" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.quayAreas ? this.props.quayAreas.map((item, index) => {
                                            return <Select.Option key={'quayArea' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
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
                                        <Select.Option value={0}><FormattedMessage id='Label.IstioMutual' /></Select.Option>
                                        <Select.Option value={1}><FormattedMessage id='Label.Disable' /></Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <DynamicFieldList keys='subset' itemComponents={(k) =>
                        [<Col span={6} key={1}>
                            <Form.Item>
                                {getFieldDecorator(`subsets[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.NumberingRequired' /> }],
                                })(
                                    <Select showSearch placeholder="Subset" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.shipyards ? this.props.shipyards.map((item, index) => {
                                            return <Select.Option key={'numbering' + index} value={item.numbering}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>]
                    } form={this.props.form} addCaption={<FormattedMessage id="Label.AddSubset" />} />
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item>
                                <Button type="primary" shape="circle" icon="plus" htmlType="submit" />
                                <Button type="primary" shape="circle" icon="reload" style={{ marginLeft: 8 }} onClick={this.props.reload} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default connect()(Form.create({ name: 'stackpolicy_draft' })(StackPolicyDraft));
