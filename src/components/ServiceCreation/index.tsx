import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { Namespace, Option } from '../../reducers/State';
import { QuayAreaIcon, BerthIcon, CraneIcon, CellGuideIcon, BrandIcon, } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IServiceCreationProps {
    protocols: Option[];
    namespaces: Namespace[];
    construct: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class ServiceCreation extends React.PureComponent<IServiceCreationProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let berths = values.berthNames ? values.berthNames.map((berthName, index) => {
                    let cellGuide = parseInt(values.berthCellGuides[index]);
                    if (isNaN(cellGuide)) {
                        cellGuide = values.berthCellGuides[index];
                    }
                    return { name: berthName, crane: values.berthCranes[index], cellGuide: cellGuide };
                }) : null;
                this.props.construct({ namespace: values.namespace, name: values.name, specificationType: values.specificationType, berths: berths, containerShipAgreementType: values.containerShipAgreementType });
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
                                <Input prefix={<QuayAreaIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.SessionAffinity" />}>
                                {getFieldDecorator('containerShipAgreementType', {
                                    rules: [{ required: true, message: 'Please input fixed bitt type!' }],
                                    initialValue: 0
                                })(
                                    <Select showSearch placeholder="ContainerShip Agreement Type" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        <Select.Option value={0}><FormattedMessage id='Label.Rent' /></Select.Option>
                                        <Select.Option value={1}><FormattedMessage id='Label.Own' /></Select.Option>
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item>
                            {getFieldDecorator('specificationType', {
                                rules: [{ required: true, message: 'Please input Specification!' }],
                                initialValue: 'http'
                            })(
                                <Select showSearch placeholder="Specification" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                    {this.props.protocols.map((item, index) => {
                                        return <Select.Option key={'specification' + index} value={item.value}>{item.name}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='credential' itemComponents={(k) =>
                    [<Col span={3} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.PortName" />}>
                                {getFieldDecorator(`berthNames[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.BerthRequired' /> }],
                                })(
                                    <Input prefix={<BerthIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Berth" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={2}>
                        <Form.Item >
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Port" />}>
                                {getFieldDecorator(`berthCranes[${k}]`, {
                                    rules: [{ required: true, message: 'Please input crane!' }],
                                })(
                                    <Input prefix={<CraneIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Crane" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>,
                    <Col span={3} key={3}>
                        <Form.Item >
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.TargetPort" />}>
                                {getFieldDecorator(`berthCellGuides[${k}]`, {
                                    rules: [{ required: true, message: 'Please input cell guide!' }],
                                })(
                                    <Input prefix={<CellGuideIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cell Guide" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Service" />} />
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

export default connect()(Form.create({ name: 'quayarea_construct' })(ServiceCreation));