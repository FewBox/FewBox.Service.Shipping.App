import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button } from 'antd';
import { BrandIcon } from '../Icon';
import { SelectedSecret } from '../../reducers/State';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';

export interface IVirtualServiceDrawerProps {
    selectedSecret: SelectedSecret;
    changeSecretData: (any) => void;
    namespace: string;
    name: string;
    form: any;
    isHelp: boolean;
}

class VirtualServiceDrawer extends React.PureComponent<IVirtualServiceDrawerProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let datas = {};
                values.dataKeys ? values.dataKeys.map((dataKey, index) => {
                    datas[dataKey] = btoa(values.dataContents[index]);
                }) : null;
                this.props.changeSecretData({ namespace: this.props.namespace, name: this.props.name, datas: datas });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <DynamicFieldList fieldName='data' initialItems={this.props.selectedSecret.datas} itemComponents={(index, data) =>
                        [<Row>
                            <Col span={12}>
                                <Form.Item>
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Secret" />}>
                                        {getFieldDecorator(`dataKeys[${index}]`, {
                                            rules: [{ required: true, message: <FormattedMessage id='Message.KeyRequired' /> }],
                                            initialValue: (data ? data.key : null)
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
                                        {getFieldDecorator(`dataContents[${index}]`, {
                                            rules: [{ required: true, message: <FormattedMessage id='Message.ContentRequired' /> }],
                                            initialValue: (data ? atob(data.value) : null)
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
                                <Button type="primary" shape="circle" icon="save" htmlType="submit" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default connect()(Form.create({ name: 'virtualservice_drawer' })(VirtualServiceDrawer));
