import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { BrandIcon } from '../Icon';
import { Subset, SelectedDestinationRule } from '../../reducers/State';
import DynamicFieldList from '../DynamicFieldList';

export interface IDestinationRuleDrawerProps {
    selectedDestinationRule: SelectedDestinationRule;
    namespace: string;
    name: string;
    changeDestinationRuleSubset: (any) => void;
    form: any;
}

class DestinationRuleDrawer extends React.PureComponent<IDestinationRuleDrawerProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let subsets = values.subsets.map((subset, index) => {
                    return { "labels": { "version": subset }, "name": subset };
                });
                this.props.changeDestinationRuleSubset({ namespace: this.props.namespace, name: this.props.name, subsets: subsets });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <DynamicFieldList fieldName='subset' initialItems={this.props.selectedDestinationRule.subsets} itemComponents={(k, i: Subset) =>
                        [<Col span={6} key={1}>
                            <Form.Item>
                                {getFieldDecorator(`subsets[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.NumberingRequired' /> }],
                                    initialValue: i ? i.name : null
                                })(
                                    <Select showSearch placeholder="Subset" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.selectedDestinationRule.deployments ? this.props.selectedDestinationRule.deployments.map((item, index) => {
                                            return <Select.Option key={'version' + index} value={item.version}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>]
                    } form={this.props.form} addCaption={<FormattedMessage id="Label.Subset" />} />
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

export default connect()(Form.create({ name: 'destinationrule_drawer' })(DestinationRuleDrawer));
