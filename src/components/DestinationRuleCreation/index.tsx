import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { Option, Namespace, Service, Deployment } from '../../reducers/State';
import { BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IDestinationRuleCreationProps {
    tlsModeOptions: Option[];
    namespaces: Namespace[];
    services: Service[];
    deployments: Deployment[];
    refreshServices: (namespaceName: string) => void;
    refreshDeployments: (app: string) => void;
    create: (any) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class DestinationRuleCreation extends React.PureComponent<IDestinationRuleCreationProps> {
    changeNamespace = (namespaceName: string) => {
        this.props.refreshServices(namespaceName);
    };
    changeDeployment = (app: string) => {
        this.props.refreshDeployments(app);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let subsets = values.subsets.map((subset, index) => {
                    return { name: subset, labels: { version: subset } }
                });
                this.props.create({ namespace: values.namespace, name: values.name, host: values.service, tLSMode: values.tLSMode, subsets: subsets });
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
                            <NamespaceDropdownList onChange={this.changeNamespace} isHelp={this.props.isHelp} form={this.props.form} namespaces={this.props.namespaces} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }],
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Service' />}>
                                {getFieldDecorator('service', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.ServiceRequired' /> }],
                                })(
                                    <Select showSearch onChange={this.changeDeployment} placeholder={<FormattedMessage id='Label.Service' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.services ? this.props.services.map((item, index) => {
                                            return <Select.Option key={'service' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.TLSMode' />}>
                                {getFieldDecorator('tLSMode', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.TLSModeRequired' /> }],
                                    initialValue: 'ISTIO_MUTUAL'
                                })(
                                    <Select showSearch placeholder={<FormattedMessage id='Label.TLSMode' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.tlsModeOptions.map((tlsModeOption, index) => {
                                            return <Select.Option key={'tlsModeOption' + index} value={tlsModeOption.value}>{tlsModeOption.name}</Select.Option>
                                        })}
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
                                        {this.props.deployments ? this.props.deployments.map((item, index) => {
                                            return <Select.Option key={'subset' + index} value={item.version}>{item.name}</Select.Option>
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

export default connect()(Form.create({ name: 'destinatinrul_creation' })(DestinationRuleCreation));
