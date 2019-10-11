import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Alert, Row, Col, Input, Button, Form, Icon, Checkbox, Avatar } from 'antd';
import { autobind } from 'core-decorators';
import { Redirect, MessageBox, MessageType } from '@fewbox/react-components';
import { Store } from '../reducers/State';
import { signIn, clearPath, hideMessage } from '../actions';
import './SignInPage.scss';

export interface ISignInProps {
    form: any;
    username: string;
    isUsernameAndPasswordValid: boolean;
    signIn: (username, password) => void;
    clearPath: () => void;
    changeUserType: any;
    redirectPath: string;
    messageType: MessageType;
    messageIntlId: string;
    messageValues: any;
    messageDuration: number;
    isMessageVisible: boolean;
    hideMessage: () => void;
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SignIn extends React.Component<ISignInProps, any> {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.form.validateFields();
    }
    @autobind
    signIn(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.signIn(values.userName, values.password);
            }
        });
    }
    @autobind
    enter(e) {
        if (e.keyCode == 13 || e.key == 'Enter') {
            this.signIn(e);
        }
    }
    public render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className="signInPage" onKeyDown={this.enter}>
                <Row type="flex" justify="center" align="top">
                    <Form layout="inline" onSubmit={this.signIn}>
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
                </Row>
                <Row>
                    <div className="copyright">
                        <FormattedMessage id="Label.Copyright" />
                    </div>
                </Row>
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
            </div>
        );
    }
}

const mapStateToProps = ({ signinPage, masterPage }: Store) => ({
    isUsernameAndPasswordValid: signinPage.isUsernameAndPasswordValid,
    redirectPath: masterPage.path,
    messageType: masterPage.messageType,
    messageIntlId: masterPage.messageIntlId,
    messageValues: masterPage.messageValues,
    messageDuration: masterPage.messageDuration,
    isMessageVisible: masterPage.isMessageVisible
})

const mapDispatchToProps = {
    signIn,
    clearPath,
    hideMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SignIn));