import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Col, Row } from 'antd';
import { CredentialIcon, BrandIcon } from '../Icon';
import { Namespace } from '../../reducers/State';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface ISecretCreationProps {
    namespaces: Namespace[];
    issue: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class SecretCreation extends React.PureComponent<ISecretCreationProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let stamps = {};
                values.stampKeys ? values.stampKeys.map((stampKey, index) => {
                    stamps[stampKey] = btoa(values.stampContents[index]);
                }) : null;
                this.props.issue({ namespace: values.namespace, name: values.name.toLowerCase(), type: values.type, stamps: stamps });
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
                                <Input prefix={<CredentialIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: 'Please input type!' }],
                            })(
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Type" />}>
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Type" /></HelpComponent>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='credential' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            {getFieldDecorator(`stampKeys[${k}]`, {
                                rules: [{ required: true, message: 'Please input key!' }],
                            })(
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Secret" />}>
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Key" /></HelpComponent>
                            )}
                        </Form.Item>
                    </Col>,
                    <Col span={12} key={2}>
                        <Form.Item>
                            {getFieldDecorator(`stampContents[${k}]`, {
                                rules: [{ required: true, message: 'Please input content!' }],
                            })(
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Data" />}>
                                    <Input.TextArea rows={4} placeholder="Content" /></HelpComponent>
                            )}
                        </Form.Item>
                    </Col>
                    ]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Secret" />} />
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

export default connect()(Form.create({ name: 'credential_issued' })(SecretCreation));