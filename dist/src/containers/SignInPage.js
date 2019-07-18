var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Alert, Row, Input, Button, Form, Icon, Checkbox, Avatar } from 'antd';
import { autobind } from 'core-decorators';
import { Redirect } from 'fewbox-react-components';
import { signIn, clearPath } from '../actions';
import './SignInPage.scss';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(function (field) { return fieldsError[field]; });
}
var SignIn = /** @class */ (function (_super) {
    __extends(SignIn, _super);
    function SignIn(props) {
        return _super.call(this, props) || this;
    }
    SignIn.prototype.componentDidMount = function () {
        this.props.form.validateFields();
    };
    SignIn.prototype.signIn = function (e) {
        var _this = this;
        e.preventDefault();
        this.props.form.validateFields(function (err, values) {
            if (!err) {
                _this.props.signIn(values.userName, values.password);
            }
        });
    };
    SignIn.prototype.enter = function (e) {
        if (e.keyCode == 13 || e.key == 'Enter') {
            this.signIn(e);
        }
    };
    SignIn.prototype.render = function () {
        var erorrMessageControl;
        if (!this.props.isUsernameAndPasswordValid) {
            erorrMessageControl = React.createElement(Alert, { message: React.createElement(FormattedMessage, { id: "SignIn.IsNotValid" }), type: "error" });
        }
        var _a = this.props.form, getFieldDecorator = _a.getFieldDecorator, getFieldsError = _a.getFieldsError, getFieldError = _a.getFieldError, isFieldTouched = _a.isFieldTouched;
        var userNameError = isFieldTouched('userName') && getFieldError('userName');
        var passwordError = isFieldTouched('password') && getFieldError('password');
        return (React.createElement("div", { className: "signInPage", onKeyDown: this.enter },
            React.createElement(Row, { type: "flex", justify: "center", align: "top" },
                React.createElement(Form, { layout: "inline", onSubmit: this.signIn },
                    React.createElement(Form.Item, null,
                        React.createElement(Avatar, { size: "large", src: "/assets/images/logo-green.svg" })),
                    React.createElement(Form.Item, { validateStatus: userNameError ? 'error' : '', help: userNameError || '' }, getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(React.createElement(Input, { prefix: React.createElement(Icon, { type: "user", style: { color: 'rgba(0,0,0,.25)' } }), placeholder: "Username" }))),
                    React.createElement(Form.Item, { validateStatus: passwordError ? 'error' : '', help: passwordError || '' }, getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(React.createElement(Input, { prefix: React.createElement(Icon, { type: "lock", style: { color: 'rgba(0,0,0,.25)' } }), type: "password", placeholder: "Password" }))),
                    React.createElement(Form.Item, null,
                        erorrMessageControl,
                        getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(React.createElement(Checkbox, null,
                            React.createElement(FormattedMessage, { id: "SignIn.RememberMe" }))),
                        React.createElement(Button, { type: "primary", htmlType: "submit", className: "login-form-button", disabled: hasErrors(getFieldsError()) },
                            React.createElement(FormattedMessage, { id: "SignIn.SignInButton" }))))),
            React.createElement(Row, null),
            React.createElement(Row, null,
                React.createElement("div", { className: "copyright" },
                    React.createElement(FormattedMessage, { id: "Layout.Copyright" }))),
            React.createElement(Redirect, { path: this.props.redirectPath, clearPath: this.props.clearPath })));
    };
    __decorate([
        autobind
    ], SignIn.prototype, "signIn", null);
    __decorate([
        autobind
    ], SignIn.prototype, "enter", null);
    return SignIn;
}(React.Component));
var mapStateToProps = function (_a) {
    var signin = _a.signin, master = _a.master;
    return ({
        isUsernameAndPasswordValid: signin.isUsernameAndPasswordValid,
        redirectPath: master.path
    });
};
var mapDispatchToProps = {
    signIn: signIn,
    clearPath: clearPath
};
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(SignIn));
//# sourceMappingURL=SignInPage.js.map