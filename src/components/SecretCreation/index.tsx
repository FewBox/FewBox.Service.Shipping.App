import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row } from 'antd';
import { SecretIcon, BrandIcon } from '../Icon';
import { Namespace } from '../../reducers/State';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface ISecretCreationProps {
    namespaces: Namespace[];
    create: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class SecretCreation extends React.PureComponent<ISecretCreationProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let datas = {};
                values.dataKeys ? values.dataKeys.map((dataKey, index) => {
                    datas[dataKey] = btoa(values.dataContents[index]);
                }) : null;
                this.props.create({ namespace: values.namespace, name: values.name.toLowerCase(), type: values.type, datas: datas });
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
                            <NamespaceDropdownList isHelp={this.props.isHelp} form={this.props.form} namespaces={this.props.namespaces} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }],
                            })(
                                <Input prefix={<SecretIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Type" />}>
                                {getFieldDecorator('type', {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.TypeRequired' /> }],
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Type" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='data' itemComponents={(k) =>
                    [<Row>
                        <Col span={12}>
                            <Form.Item>
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Secret" />}>
                                    {getFieldDecorator(`dataKeys[${k}]`, {
                                        rules: [{ required: true, message: <FormattedMessage id='Message.KeyRequired' /> }],
                                    })(
                                        <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Key" />
                                    )}
                                </HelpComponent>
                            </Form.Item>
                        </Col>
                    </Row>,
                    <Row>
                        <Col span={12}>
                            <Form.Item>
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Data" />}>
                                    {getFieldDecorator(`dataContents[${k}]`, {
                                        rules: [{ required: true, message: <FormattedMessage id='Message.ContentRequired' /> }],
                                    })(
                                        <Input.TextArea rows={18} placeholder="Content" />
                                    )}
                                </HelpComponent>
                            </Form.Item>
                        </Col>
                    </Row>
                    ]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Data" />} />
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

export default connect()(Form.create({ name: 'secret_creation' })(SecretCreation));