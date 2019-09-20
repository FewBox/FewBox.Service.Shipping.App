import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Select, Input, Button } from 'antd';
import { ShippingLine, GateArea, QuayArea } from '../../reducers/State';
import { ShippingLineIcon, BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';

export interface IYardAreaConstructionProps {
    shippingLines: ShippingLine[];
    gateAreas: GateArea[];
    quayAreas: QuayArea[];
    refreshGateAreas: (shippingLine: string) => void;
    refreshQuayAreas: (shippingLine: string) => void;
    construct: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class YardAreaConstruction extends React.PureComponent<IYardAreaConstructionProps> {
    changeShippingLine = (shippingLine: string) => {
        this.props.refreshGateAreas(shippingLine);
        this.props.refreshQuayAreas(shippingLine);
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = values;
                let guideboards = values.guideboard.map((guideboard, index) => {
                    let targets = data.targets[index].map((target, targetIndex) => {
                        if (data.targetTypes[index][targetIndex] === 'exact') {
                            return { exact: target };
                        }
                        else if (data.targetTypes[index][targetIndex] === 'prefix') {
                            return { prefix: target };
                        }
                    });
                    let directions = data.directionQuayAreas[index].map((directionQuayArea, directionQuayAreaIndex) => {
                        return { quayArea: directionQuayArea, crane: data.directionCranes[index][directionQuayAreaIndex] };
                    });
                    return { targets: targets, directions: directions };
                });
                this.props.construct({ shippingLine: values.shippingLine, name: values.name, aliases: values.aliases, gateAreas: values.gateAreas, guideboards: guideboards });
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
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Namespace' />}>
                                {getFieldDecorator('shippingLine', {
                                    rules: [{ required: true, message: 'Please input Shipping Line!' }],
                                })(
                                    <Select showSearch onChange={this.changeShippingLine} placeholder="Shipping Line" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.shippingLines.map((item, index) => {
                                            return <Select.Option key={'shippingline' + index} value={item.name}>{item.name}</Select.Option>
                                        })}
                                    </Select>
                                )}
                            </HelpComponent>
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
                <DynamicFieldList fieldName='alias' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Host' />}>
                                {getFieldDecorator(`aliases[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.AliasRequired' /> }],
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Alias" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Alias" />} />
                <DynamicFieldList fieldName='gateArea' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Gateway' />}>
                                {getFieldDecorator(`gateAreas[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.GateAreaRequired' /> }],
                                })(
                                    <Select showSearch placeholder="GateArea" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.gateAreas ? this.props.gateAreas.map((item, index) => {
                                            return <Select.Option key={'gateArea' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.GateArea" />} />
                <DynamicFieldList fieldName='guideboard' itemComponents={(k1) =>
                    [<Col offset={1} span={6} key={1}>
                        <Form.Item>
                            <DynamicFieldList fieldName={'target' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Match' />}>
                                            {getFieldDecorator(`targetTypes[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.TypeRequired' /> }],
                                            })(
                                                <Select showSearch placeholder="Type" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                    <Select.Option value='exact'><FormattedMessage id='Label.Address' /></Select.Option>
                                                    <Select.Option value='prefix'><FormattedMessage id='Label.Area' /></Select.Option>
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={2}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Uri' />}>
                                            {getFieldDecorator(`targets[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.InformationRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Information" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Target" />} />
                            <DynamicFieldList fieldName={'direction' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Service' />}>
                                            {getFieldDecorator(`directionQuayAreas[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.QuayAreaRequired' /> }],
                                            })(
                                                <Select showSearch placeholder="QuayArea" optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                    {this.props.quayAreas ? this.props.quayAreas.map((item, index) => {
                                                        return <Select.Option key={'quayArea' + index} value={item.name}>{item.name}</Select.Option>
                                                    }) : null}
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={2}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                            {getFieldDecorator(`directionCranes[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.CraneRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Crane" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Crane" />} />
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