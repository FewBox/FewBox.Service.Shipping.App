import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { StackPolicy, Namespace, QuayArea, Shipyard } from '../../reducers/State';
import { BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IDestinationRuleCreationProps {
    stackPolicys: StackPolicy[];
    namespaces: Namespace[];
    quayAreas: QuayArea[];
    shipyards: Shipyard[];
    refreshQuayAreas: (namespaceName: string) => void;
    refreshShipyards: (identificationCode: string) => void;
    draft: (any) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class DestinationRuleCreation extends React.PureComponent<IDestinationRuleCreationProps> {
    changeNamespace = (namespaceName: string) => {
        this.props.refreshQuayAreas(namespaceName);
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
                this.props.draft({ namespace: values.namespace, name: values.name, alias: values.alias, trafficPolicyMode: values.trafficPolicyMode, subsets: subsets });
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
                            <NamespaceDropdownList isHelp={this.props.isHelp} getFieldDecorator={getFieldDecorator} namespaces={this.props.namespaces} />
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
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Service' />}>
                                {getFieldDecorator('alias', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.QuayAreaRequired' /> }],
                                })(
                                    <Select showSearch onChange={this.changeShipyard} placeholder="QuayArea" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.quayAreas ? this.props.quayAreas.map((item, index) => {
                                            return <Select.Option key={'quayArea' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.TLSMode' />}>
                                {getFieldDecorator('trafficPolicyMode', {
                                    rules: [{ required: true, message: 'Please input traffic policy mode!' }],
                                    initialValue: 0
                                })(
                                    <Select showSearch placeholder="Traffic Policy Mode" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        <Select.Option value={0}><FormattedMessage id='Label.IstioMutual' /></Select.Option>
                                        <Select.Option value={1}><FormattedMessage id='Label.Disable' /></Select.Option>
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='subset' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Version' />}>
                                {getFieldDecorator(`subsets[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.NumberingRequired' /> }],
                                })(
                                    <Select showSearch placeholder="Subset" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.shipyards ? this.props.shipyards.map((item, index) => {
                                            return <Select.Option key={'subset' + index} value={item.numbering}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Subset" />} />
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

export default connect()(Form.create({ name: 'stackpolicy_draft' })(DestinationRuleCreation));
