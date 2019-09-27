import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button } from 'antd';
import { ImageIcon } from '../Icon';

export interface IDeploymentDrawerProps {
    images: string[];
    namespace: string;
    name: string;
    changePodVersion: (any) => void;
    form: any;
}

class DeploymentDrawer extends React.PureComponent<IDeploymentDrawerProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changePodVersion({ namespace: this.props.namespace, name: this.props.name, images: values.images });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {this.props.images.map((image, index) => {
                        return <Row gutter={16} key={'imageRow' + index}>
                            <Col span={24}>
                                <Form.Item>
                                    {getFieldDecorator(`images[${index}]`, {
                                        rules: [{ required: true, message: <FormattedMessage id='Message.ImageRequired' /> }],
                                        initialValue: image
                                    })(
                                        <Input prefix={<ImageIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Image" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>;
                    })}
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

export default connect()(Form.create({ name: 'deployment_drawer' })(DeploymentDrawer));
