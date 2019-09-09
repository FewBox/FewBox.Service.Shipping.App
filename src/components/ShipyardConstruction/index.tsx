import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Select, Row, Col, InputNumber, Switch } from 'antd';
import { ShippingLine } from '../../reducers/State';
import { ShippingLineIcon, ShipyardIcon, NumberingIcon, ContainerIcon, DoorIcon, CargoPackagePolicyIcon, CaptainIcon, BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';

export interface IShipyardConstructionProps {
    shippingLines: ShippingLine[];
    construct: (any) => void;
    reload: () => void;
    form: any;
}

class ShipyardConstruction extends React.PureComponent<IShipyardConstructionProps> {
    validateNumbering = (rule, value, callback) => {
        const { getFieldValue } = this.props.form
        if (value.indexOf(':') != -1) {
            callback('Please remove the numbering.')
        }
        callback()
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let doors = values.doorNames ? values.doorNames.map((doorName, index) => {
                    return { name: doorName, leaf: values.doorLeafs[index] };
                }) : null;
                
                let documentCredentials = values.documentNames ? values.documentNames.map((documentName, index) => {
                    return { name: documentName, secret: { secretName: values.documentCredentialNames[index] } };
                }) : null;
                let documentCredentialDefinitions = values.documentNames ? values.documentNames.map((documentName, index) => {
                    return {
                        name: documentName, term: values.documentCredentialTerms[index],
                        subTerm: values.documentCredentialSubTerms ? values.documentCredentialSubTerms[index] : null,
                        isWaterMarked: values.documentCredentialIsWaterMarkeds[index]
                    };
                }) : null;
                let documents = documentCredentials;
                let documentDefinitions = documentCredentialDefinitions;
                this.props.construct({
                    shippingLine: values.shippingLine,
                    name: values.name,
                    captain: values.captain,
                    numbering: values.numbering,
                    quantity: values.quantity,
                    cargo: values.cargo,
                    cargoPackagePolicy: values.cargoPackagePolicy,
                    doors: doors,
                    documents: documents,
                    documentDefinitions: documentDefinitions
                });
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
                                <Input prefix={<ShipyardIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('numbering', {
                                rules: [{ required: true, message: 'Please input numbering!' }],
                                initialValue: 'latest'
                            })(
                                <Input prefix={<NumberingIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Numbering" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('cargo', {
                                rules: [{ required: true, message: 'Please input cargo!' }, { validator: this.validateNumbering }],
                            })(
                                <Input prefix={<ContainerIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cargo" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('captain', {
                                rules: [{ required: true, message: 'Please input captain!' }],
                            })(
                                <Input prefix={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Captain" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('cargoPackagePolicy', {
                                rules: [{ required: true, message: 'Please input cargo package policy!' }],
                                initialValue: '0'
                            })(
                                <Select suffixIcon={<CargoPackagePolicyIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                    <Select.Option value="0">IfNotPresent</Select.Option>
                                    <Select.Option value="1">Always</Select.Option>
                                    <Select.Option value="2">Never</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('quantity', {
                                rules: [{ required: true, message: 'Please input quantity!' }],
                                initialValue: '2'
                            })(
                                <InputNumber min={1} max={10} />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList keys='door' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            {getFieldDecorator(`doorNames[${k}]`, {
                                rules: [{ required: true, message: 'Please input door name!' }],
                                initialValue: 'http'
                            })(
                                <Select suffixIcon={<DoorIcon style={{ color: 'rgba(0,0,0,.25)' }} />} style={{ width: '100%' }} placeholder="Door Name">
                                    <Select.Option value="http">http</Select.Option>
                                    <Select.Option value="https">https</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={2}>
                        <Form.Item>
                            {getFieldDecorator(`doorLeafs[${k}]`, {
                                rules: [{ required: true, message: 'Please input leaf!' }],
                                initialValue: 80
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Leaf" />
                            )}
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.AddDoor" />} />
                <DynamicFieldList keys='credential' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            {getFieldDecorator(`documentNames[${k}]`, {
                                rules: [{ required: true, message: 'Please input name!' }]
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item>
                            {getFieldDecorator(`documentCredentialNames[${k}]`, {
                                rules: [{ required: true, message: 'Please input credential name!' }]
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Credential" />
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={3}>
                        <Form.Item>
                            {getFieldDecorator(`documentCredentialTerms[${k}]`, {
                                rules: [{ required: true, message: 'Please input term!' }]
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Term" />
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={6} key={4}>
                        <Form.Item>
                            {getFieldDecorator(`documentCredentialSubTerms[${k}]`, {
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="SubTerm" />
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={2} key={5}>
                        <Form.Item>
                            {getFieldDecorator(`documentCredentialIsWaterMarkeds[${k}]`, {
                                rules: [{ required: true, message: 'Please input name!' }],
                                initialValue: true
                            })(
                                <Switch checkedChildren={<BrandIcon />} unCheckedChildren={<BrandIcon />} />
                            )}
                        </Form.Item>
                    </Col>]
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

export default connect()(Form.create({ name: 'shipyard_construction' })(ShipyardConstruction));