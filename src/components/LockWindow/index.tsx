import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, Button, Form, Avatar, Input, Icon, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { reSignIn } from '../../actions';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class LockWindow extends React.PureComponent<any> {
    componentDidMount() {
        this.props.form.validateFields();
    }
    @autobind
    reSignIn(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.reSignIn(values.userName, values.password);
            }
        });
    }
    @autobind
    enter(e) {
        if (e.keyCode == 13 || e.key == 'Enter') {
            this.reSignIn(e);
        }
    }
    public render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Modal visible={this.props.isVisiable} title={<FormattedMessage id='Label.Lock' />} onCancel={this.props.close}
                footer={[]}
            >
                <Form onSubmit={this.reSignIn}>
                    <Form.Item>
                        <Avatar size="large" src="/assets/images/logo-green.svg" />
                    </Form.Item>
                    <Form.Item validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: <FormattedMessage id='Message.UsernameRequired' /> }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: <FormattedMessage id='Message.PasswordRequired' /> }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox><FormattedMessage id="Label.RememberMe" /></Checkbox>
                        )}
                        <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())}>
                            <FormattedMessage id="Label.SignIn" />
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = {
    reSignIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LockWindow));