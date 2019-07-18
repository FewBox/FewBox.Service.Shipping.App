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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { FormattedMessage } from 'react-intl';
import { Layout, Menu, Icon, Dropdown, Avatar, Skeleton } from 'antd';
var Header = Layout.Header, Sider = Layout.Sider, Content = Layout.Content, Footer = Layout.Footer;
import { Route, Link, Switch } from 'react-router-dom';
import { Redirect, MessageBox } from 'fewbox-react-components';
import { hideMessage, signOut, clearPath } from '../actions';
var LandingPage = lazy(function () { return import('./LandingPage'); });
var AboutPage = lazy(function () { return import('./AboutPage'); });
var TerminalPage = lazy(function () { return import('./TerminalPage'); });
var ShippingLanePage = lazy(function () { return import('./ShippingLanePage'); });
import './MasterPage.scss';
var ShippingLaneSvg = function () { return (React.createElement("svg", { fill: "#FFFFFF", x: "0px", y: "0px", viewBox: "0 0 32 32" },
    React.createElement("g", { display: "none" },
        React.createElement("rect", { x: "-164.73", y: "-46.333", display: "inline", fill: "#FFFFFF", width: "412.397", height: "207" })),
    React.createElement("g", null,
        React.createElement("g", null,
            React.createElement("path", { d: "M5.294,10.783l0.128,0.291l3.807,7.034l3.265-6.033c0.672,0.251,2.262,0.954,2.701,2.136    c0.228,0.613,0.106,1.275-0.372,2.023c-1.123,1.757-1.298,3.45-0.479,4.648c0.7,1.023,2.036,1.56,3.796,1.56    c0.631,0,1.32-0.073,2.049-0.213L22.771,27l3.812-7.044l0.116-0.263c0.057-0.143,0.107-0.291,0.149-0.442    c0.1-0.36,0.153-0.739,0.153-1.131c0-2.336-1.894-4.229-4.229-4.229s-4.229,1.894-4.229,4.229c0,0.392,0.053,0.771,0.153,1.131    c0.04,0.144,0.087,0.285,0.141,0.423l0.128,0.291l0.722,1.334c-2.195,0.364-3.833,0.019-4.516-0.981    c-0.582-0.851-0.401-2.143,0.495-3.545c0.651-1.019,0.808-1.999,0.466-2.915c-0.553-1.48-2.283-2.328-3.156-2.672l0.066-0.122    l0.116-0.263c0.057-0.143,0.107-0.291,0.149-0.442c0.1-0.36,0.153-0.739,0.153-1.131C13.459,6.894,11.565,5,9.229,5    C6.894,5,5,6.894,5,9.229C5,9.621,5.053,10,5.153,10.36C5.193,10.504,5.24,10.645,5.294,10.783z M19.541,18.121    c0-1.781,1.449-3.229,3.229-3.229S26,16.34,26,18.121c0,0.293-0.039,0.584-0.117,0.864c-0.032,0.115-0.07,0.227-0.101,0.305    l-0.099,0.225l-2.913,5.383l-2.908-5.374l-0.096-0.218c-0.041-0.105-0.077-0.212-0.108-0.322    C19.58,18.704,19.541,18.414,19.541,18.121z M9.229,6c1.781,0,3.229,1.449,3.229,3.229c0,0.293-0.039,0.584-0.117,0.864    c-0.032,0.115-0.07,0.227-0.101,0.306l-0.099,0.225l-2.913,5.383l-2.909-5.374l-0.096-0.218c-0.041-0.105-0.077-0.212-0.108-0.322    C6.039,9.813,6,9.523,6,9.229C6,7.449,7.449,6,9.229,6z" }),
            React.createElement("path", { d: "M9.229,11.062c1.034,0,1.871-0.838,1.871-1.871c0-1.033-0.838-1.871-1.871-1.871c-1.033,0-1.871,0.838-1.871,1.871    C7.358,10.225,8.196,11.062,9.229,11.062z M9.229,8.32c0.48,0,0.871,0.391,0.871,0.871c0,0.48-0.391,0.871-0.871,0.871    c-0.48,0-0.871-0.391-0.871-0.871C8.358,8.711,8.749,8.32,9.229,8.32z" }),
            React.createElement("path", { d: "M22.771,19.954c1.034,0,1.871-0.838,1.871-1.871c0-1.034-0.838-1.871-1.871-1.871s-1.871,0.838-1.871,1.871    C20.899,19.116,21.737,19.954,22.771,19.954z M22.771,17.211c0.48,0,0.871,0.391,0.871,0.871c0,0.48-0.391,0.871-0.871,0.871    s-0.871-0.391-0.871-0.871C21.899,17.602,22.29,17.211,22.771,17.211z" }),
            React.createElement("path", { d: "M4.512,32h22.977C29.976,32,32,29.976,32,27.488V4.512C32,2.024,29.976,0,27.488,0H4.512C2.024,0,0,2.024,0,4.512v22.977    C0,29.976,2.024,32,4.512,32z M1,4.512C1,2.572,2.572,1,4.512,1h22.977C29.428,1,31,2.572,31,4.512v22.977    C31,29.428,29.428,31,27.488,31H4.512C2.572,31,1,29.428,1,27.488V4.512z" }))),
    React.createElement("g", { display: "none" },
        React.createElement("g", { display: "inline" },
            React.createElement("path", { d: "M5.294,10.783l0.128,0.291l3.807,7.034l3.025-5.591c0.705,0.255,2.125,0.933,2.472,1.869    c0.062,0.167,0.251,0.677-0.325,1.578c-1.213,1.897-1.37,3.773-0.432,5.147c0.82,1.201,2.345,1.831,4.324,1.831    c0.67,0,1.395-0.076,2.16-0.224L22.771,27l3.812-7.044l0.116-0.263c0.057-0.143,0.107-0.291,0.149-0.442    c0.1-0.36,0.153-0.739,0.153-1.131c0-2.336-1.894-4.229-4.229-4.229s-4.229,1.894-4.229,4.229c0,0.392,0.053,0.771,0.153,1.131    c0.04,0.144,0.087,0.285,0.141,0.423l0.128,0.291l0.483,0.893c-1.843,0.242-3.279-0.072-3.826-0.875    c-0.465-0.68-0.295-1.752,0.466-2.941c0.922-1.442,0.787-2.623,0.513-3.359c-0.621-1.663-2.456-2.577-3.418-2.955    c0.046-0.121,0.09-0.243,0.124-0.368c0.1-0.36,0.153-0.739,0.153-1.131C13.459,6.894,11.565,5,9.229,5C6.894,5,5,6.894,5,9.229    C5,9.621,5.053,10,5.153,10.36C5.193,10.504,5.24,10.645,5.294,10.783z M22.771,15.891c1.229,0,2.229,1,2.229,2.229    c0,0.203-0.027,0.404-0.081,0.597c-0.019,0.07-0.042,0.138-0.068,0.205l-0.067,0.153l-2.014,3.722l-2.009-3.712l-0.077-0.176    c-0.024-0.063-0.044-0.127-0.062-0.192c-0.054-0.193-0.081-0.394-0.081-0.597C20.541,16.891,21.541,15.891,22.771,15.891z     M9.229,7c1.229,0,2.229,1,2.229,2.229c0,0.203-0.027,0.404-0.081,0.597c-0.019,0.07-0.042,0.138-0.068,0.205l-0.067,0.152    l-2.014,3.722L7.22,10.194l-0.077-0.176C7.119,9.956,7.099,9.892,7.081,9.827C7.027,9.633,7,9.432,7,9.229C7,8,8,7,9.229,7z" }),
            React.createElement("path", { d: "M4.512,32h22.977C29.976,32,32,29.976,32,27.488V4.512C32,2.024,29.976,0,27.488,0H4.512C2.024,0,0,2.024,0,4.512v22.977    C0,29.976,2.024,32,4.512,32z M2,4.512C2,3.127,3.127,2,4.512,2h22.977C28.873,2,30,3.127,30,4.512v22.977    C30,28.873,28.873,30,27.488,30H4.512C3.127,30,2,28.873,2,27.488V4.512z" }))),
    React.createElement("g", { display: "none" },
        React.createElement("g", { display: "inline" },
            React.createElement("path", { d: "M19.862,19.524l2.908,5.374l2.913-5.383l0.099-0.225c0.031-0.079,0.069-0.191,0.101-0.305    C25.961,18.704,26,18.414,26,18.121c0-1.781-1.449-3.229-3.229-3.229s-3.229,1.449-3.229,3.229c0,0.293,0.039,0.584,0.117,0.864    c0.03,0.11,0.066,0.217,0.108,0.322L19.862,19.524z M22.771,16.605c0.812,0,1.47,0.658,1.47,1.47c0,0.812-0.658,1.47-1.47,1.47    s-1.47-0.658-1.47-1.47C21.3,17.263,21.959,16.605,22.771,16.605z" }),
            React.createElement("path", { d: "M6.225,10.416l0.096,0.218l2.909,5.374l2.913-5.383l0.099-0.225c0.031-0.078,0.069-0.191,0.101-0.306    c0.078-0.28,0.117-0.571,0.117-0.864C12.459,7.449,11.01,6,9.229,6C7.449,6,6,7.449,6,9.229c0,0.293,0.039,0.584,0.117,0.864    C6.147,10.203,6.183,10.311,6.225,10.416z M9.229,7.729c0.812,0,1.47,0.658,1.47,1.47c0,0.812-0.658,1.47-1.47,1.47    s-1.47-0.658-1.47-1.47C7.759,8.387,8.417,7.729,9.229,7.729z" }),
            React.createElement("path", { d: "M4.512,32h22.977C29.976,32,32,29.976,32,27.488V4.512C32,2.024,29.976,0,27.488,0H4.512C2.024,0,0,2.024,0,4.512v22.977    C0,29.976,2.024,32,4.512,32z M9.229,5c2.336,0,4.229,1.894,4.229,4.229c0,0.392-0.053,0.771-0.153,1.131    c-0.042,0.151-0.092,0.298-0.149,0.442l-0.116,0.263l-0.066,0.122c0.873,0.344,2.603,1.192,3.156,2.672    c0.342,0.916,0.186,1.896-0.466,2.915c-0.896,1.402-1.077,2.694-0.495,3.545c0.683,1,2.321,1.345,4.516,0.981l-0.722-1.334    l-0.128-0.291c-0.054-0.138-0.101-0.279-0.141-0.423c-0.1-0.36-0.153-0.739-0.153-1.131c0-2.336,1.894-4.229,4.229-4.229    S27,15.785,27,18.121c0,0.392-0.053,0.771-0.153,1.131c-0.042,0.151-0.092,0.298-0.149,0.442l-0.116,0.263L22.771,27l-2.582-4.771    c-0.73,0.14-1.418,0.213-2.049,0.213c-1.76,0-3.096-0.536-3.796-1.56c-0.818-1.198-0.644-2.892,0.479-4.648    c0.479-0.748,0.6-1.41,0.372-2.023c-0.44-1.182-2.029-1.884-2.701-2.136l-3.265,6.033l-3.807-7.034l-0.128-0.291    c-0.054-0.138-0.102-0.279-0.141-0.423C5.053,10,5,9.621,5,9.229C5,6.894,6.894,5,9.229,5z" }))),
    React.createElement("g", { display: "none" },
        React.createElement("g", { display: "inline" },
            React.createElement("path", { d: "M5.294,10.783l0.128,0.291l3.807,7.034l3.385-6.256c0.729,0.279,2.349,1.022,2.814,2.269    c0.255,0.683,0.121,1.438-0.396,2.247c-1.065,1.668-1.242,3.262-0.483,4.372c0.652,0.954,1.913,1.452,3.584,1.452    c0.593,0,1.242-0.07,1.929-0.197L22.771,27l3.812-7.044l0.116-0.263c0.057-0.143,0.107-0.291,0.149-0.442    c0.1-0.36,0.153-0.739,0.153-1.131c0-2.336-1.894-4.229-4.229-4.229s-4.229,1.894-4.229,4.229c0,0.392,0.053,0.771,0.153,1.131    c0.04,0.144,0.087,0.285,0.141,0.423l0.128,0.291l0.848,1.566c-2.338,0.404-4.099,0.024-4.849-1.073    c-0.641-0.938-0.461-2.33,0.492-3.82c0.606-0.948,0.755-1.854,0.441-2.692c-0.526-1.41-2.215-2.218-3.041-2.539l0.186-0.343    l0.116-0.263c0.057-0.143,0.107-0.291,0.149-0.442c0.1-0.36,0.153-0.739,0.153-1.131C13.459,6.894,11.565,5,9.229,5    C6.894,5,5,6.894,5,9.229C5,9.621,5.053,10,5.153,10.36C5.193,10.504,5.24,10.645,5.294,10.783z M19.301,19.49    c-0.048-0.121-0.089-0.245-0.125-0.372c-0.09-0.324-0.135-0.659-0.135-0.997c0-2.056,1.673-3.729,3.729-3.729    s3.729,1.673,3.729,3.729c0,0.338-0.045,0.674-0.135,0.997c-0.037,0.133-0.081,0.263-0.125,0.374l-0.098,0.226L22.77,25.95    l-3.349-6.185L19.301,19.49z M9.229,5.5c2.056,0,3.729,1.673,3.729,3.729c0,0.338-0.045,0.674-0.135,0.997    c-0.037,0.133-0.081,0.263-0.125,0.374l-0.098,0.226l-3.372,6.232L5.88,10.873l-0.121-0.274c-0.048-0.121-0.089-0.245-0.124-0.372    C5.545,9.903,5.5,9.568,5.5,9.229C5.5,7.173,7.173,5.5,9.229,5.5z" }),
            React.createElement("path", { d: "M9.229,11.062c1.034,0,1.871-0.838,1.871-1.871c0-1.033-0.838-1.871-1.871-1.871c-1.033,0-1.871,0.838-1.871,1.871    C7.358,10.225,8.196,11.062,9.229,11.062z M9.229,7.82c0.756,0,1.371,0.615,1.371,1.371c0,0.756-0.615,1.371-1.371,1.371    c-0.756,0-1.371-0.615-1.371-1.371C7.858,8.435,8.473,7.82,9.229,7.82z" }),
            React.createElement("path", { d: "M24.642,18.082c0-1.034-0.838-1.871-1.871-1.871s-1.871,0.838-1.871,1.871c0,1.033,0.838,1.871,1.871,1.871    S24.642,19.116,24.642,18.082z M21.399,18.082c0-0.756,0.615-1.371,1.371-1.371c0.756,0,1.371,0.615,1.371,1.371    c0,0.756-0.615,1.371-1.371,1.371C22.014,19.454,21.399,18.839,21.399,18.082z" }),
            React.createElement("path", { d: "M4.131,32.017h23.739c2.278,0,4.131-1.853,4.131-4.131V4.114c0-2.278-1.853-4.131-4.131-4.131H4.131    C1.853-0.017,0,1.836,0,4.114v23.772C0,30.164,1.853,32.017,4.131,32.017z M0.5,4.114c0-2.005,1.626-3.631,3.631-3.631h23.739    c2.005,0,3.631,1.625,3.631,3.631v23.772c0,2.005-1.626,3.631-3.631,3.631H4.131c-2.005,0-3.631-1.626-3.631-3.631V4.114z" }))))); };
var ShippingLaneIcon = function (props) { return React.createElement(Icon, __assign({ component: ShippingLaneSvg }, props)); };
var MasterPage = /** @class */ (function (_super) {
    __extends(MasterPage, _super);
    function MasterPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { collapsed: false };
        return _this;
    }
    MasterPage.prototype.toggle = function () {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    MasterPage.prototype.render = function () {
        var menu = (React.createElement(Menu, null,
            React.createElement(Menu.Item, null,
                React.createElement(Link, { to: "/", onClick: this.props.signOut },
                    React.createElement(FormattedMessage, { id: "Layout.SignOut" })))));
        return (React.createElement("div", { className: "masterPage" },
            React.createElement(Redirect, { path: this.props.redirectPath, clearPath: this.props.clearPath }),
            React.createElement(MessageBox, { isVisable: this.props.messageIsVisible, type: this.props.messageType, intlId: this.props.messageIntlId, duration: this.props.messageDuration, values: this.props.messageValues, onClose: function () { } }),
            React.createElement(Layout, { style: { minHeight: '100vh' } },
                React.createElement(Sider, { trigger: null, collapsible: true, collapsed: this.state.collapsed },
                    React.createElement("div", { className: "logo" }),
                    React.createElement(Menu, { theme: "dark", mode: "inline", defaultSelectedKeys: ['1'] },
                        React.createElement(Menu.Item, { key: "1" },
                            React.createElement(Link, { to: '/master/landing' },
                                React.createElement(Icon, { type: "home" }),
                                React.createElement(FormattedMessage, { id: "Navigation.Landing" }))),
                        React.createElement(Menu.Item, { key: "2" },
                            React.createElement(Link, { to: '/master/shippinglane' },
                                React.createElement(ShippingLaneIcon, null),
                                React.createElement(FormattedMessage, { id: "Navigation.ShippingLane" }))),
                        React.createElement(Menu.Item, { key: "12" },
                            React.createElement(Link, { to: '/master/terminal/localhost/5001/fewbox-staging/auth-deployment-latest-c56c67c8-vj7ph/auth' },
                                React.createElement(Icon, { type: "code" }),
                                React.createElement(FormattedMessage, { id: "Navigation.Terminal" }))),
                        React.createElement(Menu.Item, { key: "13" },
                            React.createElement(Link, { to: '/master/about' },
                                React.createElement(Icon, { type: "info-circle" }),
                                React.createElement(FormattedMessage, { id: "Navigation.About" }))))),
                React.createElement(Layout, null,
                    React.createElement(Header, { style: { background: '#fff', padding: 0 } },
                        React.createElement(Icon, { className: "trigger", type: this.state.collapsed ? 'menu-unfold' : 'menu-fold', onClick: this.toggle }),
                        React.createElement(Dropdown, { overlay: menu },
                            React.createElement("a", { className: "ant-dropdown-link", href: "#", style: { float: 'right', marginRight: '20px' } },
                                React.createElement(Avatar, { icon: "user", style: { marginRight: '5px' } }),
                                React.createElement(Icon, { type: "down" })))),
                    React.createElement(Content, { style: { margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 } },
                        React.createElement(Suspense, { fallback: React.createElement(Skeleton, { active: true }) },
                            React.createElement(Switch, null,
                                React.createElement(Route, { path: "/master/landing", render: function (props) { return React.createElement(LandingPage, __assign({}, props)); } }),
                                React.createElement(Route, { path: "/master/shippinglane", render: function (props) { return React.createElement(ShippingLanePage, __assign({}, props)); } }),
                                React.createElement(Route, { path: "/master/about", render: function (props) { return React.createElement(AboutPage, __assign({}, props)); } }),
                                React.createElement(Route, { path: "/master/terminal/:host/:port/:namespace/:pod/:container", render: function (props) { return React.createElement(TerminalPage, __assign({}, props)); } })))),
                    React.createElement(Footer, null,
                        React.createElement(FormattedMessage, { id: "Layout.Copyright" }))))));
    };
    __decorate([
        autobind
    ], MasterPage.prototype, "toggle", null);
    return MasterPage;
}(React.Component));
var mapStateToProps = function (_a) {
    var master = _a.master;
    return ({
        messageType: master.messageType,
        messageIntlId: master.messageIntlId,
        messageValues: master.messageValues,
        messageDuration: master.messageDuration,
        messageIsVisible: master.messageIsVisible,
        redirectPath: master.path
    });
};
var mapDispatchToProps = {
    hideMessage: hideMessage,
    signOut: signOut,
    clearPath: clearPath
};
export default connect(mapStateToProps, mapDispatchToProps)(MasterPage);
//# sourceMappingURL=MasterPage.js.map