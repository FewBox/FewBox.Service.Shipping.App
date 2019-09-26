import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button } from 'antd';
import { ImageIcon } from '../Icon';

export interface IDeploymentDrawerProps {
    cargos: string[];
    namespaceName: string;
    name: string;
    changeContainerShipNumbering: (any) => void;
    form: any;
}

class DeploymentDrawer extends React.PureComponent<IDeploymentDrawerProps> {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changeContainerShipNumbering({ namespace: this.props.namespaceName, name: this.props.name, cargos: values.cargos });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {this.props.cargos.map((cargo, index) => {
                        return <Row gutter={16} key={'CargoRow' + index}>
                            <Col span={24}>
                                <Form.Item>
                                    {getFieldDecorator(`cargos[${index}]`, {
                                        rules: [{ required: true, message: 'Please input cargo!' }],
                                        initialValue: this.props.cargos[index]
                                    })(
                                        <Input prefix={<ImageIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Cargo" />
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
