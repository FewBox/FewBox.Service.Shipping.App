import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { CargoIcon, ShippingLineIcon } from '../Icon';
import { Subset, Shipyard } from '../../reducers/State';
import DynamicFieldList from '../DynamicFieldList';

export interface IStackPolicyDrawerProps {
    subsets: Subset[];
    shipyards: Shipyard[];
    shippingLine: string;
    name: string;
    changeStackPolicySubset: (any) => void;
    form: any;
}

class StackPolicyDrawer extends React.PureComponent<IStackPolicyDrawerProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changeStackPolicySubset({ shippingLine: this.props.shippingLine, name: this.props.name, subsets: values.subsets });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        debugger;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <DynamicFieldList fieldName='subset' initialItems={this.props.subsets} itemComponents={(k, i: Subset) =>
                        [<Col span={6} key={1}>
                            <Form.Item>
                                {getFieldDecorator(`subsets[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.NumberingRequired' /> }],
                                    initialValue: i ? i.name : null
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
                                <Button type="primary" shape="circle" icon="save" htmlType="submit" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default connect()(Form.create({ name: 'shipyard_renovation' })(StackPolicyDrawer));
