import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Alert, Row, Col, Input, Button, Form, Icon, Checkbox, Avatar } from 'antd';
import { autobind } from 'core-decorators';
import { Redirect } from 'fewbox-react-components';
import { Store } from '../reducers/State';
import { signIn, clearPath } from '../actions';
import './SignInPage.scss';

export interface ISignInProps {
    form: any;
    username: string;
    isUsernameAndPasswordValid: boolean;
    signIn: any;
    clearPath: any;
    changeUserType: any;
    redirectPath: string;
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
        let erorrMessageControl;
        if (!this.props.isUsernameAndPasswordValid) {
            erorrMessageControl = <Alert message={<FormattedMessage id="SignIn.IsNotValid" />} type="error" />;
        }
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
                            <Avatar src="/assets/images/logo.png" />
                        </Form.Item>
                        <Form.Item validateStatus={userNameError ? 'error' : ''} help={userNameError || ''}>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {erorrMessageControl}
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <Button type="primary" htmlType="submit" className="login-form-button" disabled={hasErrors(getFieldsError())}>
                                <FormattedMessage id="SignIn.SignInButton" />
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
                <Row>
                </Row>
                <Row>
                    <div className="copyright">
                        <FormattedMessage id="Layout.Copyright" />
                    </div>
                </Row>
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
            </div>
        );
    }
}

const mapStateToProps = ({ signin, master }: Store) => ({
    isUsernameAndPasswordValid: signin.isUsernameAndPasswordValid,
    redirectPath: master.path
})

const mapDispatchToProps = {
    signIn,
    clearPath
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SignIn));