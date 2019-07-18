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
import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// Language
import langs from '../langs';
// Page
import ComingSoonPage from './ComingSoonPage';
import SignInPage from './SignInPage';
import MasterPage from './MasterPage';
//import "antd/dist/antd.css";
import "antd/dist/antd.less";
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(IntlProvider, { locale: 'en', messages: langs(this.props.lang) },
            React.createElement(Router, null,
                React.createElement("div", null,
                    React.createElement(Switch, null,
                        React.createElement(Route, { exact: true, path: "/", component: SignInPage }),
                        React.createElement(Route, { exact: true, path: "/signin", component: SignInPage }),
                        React.createElement(Route, { path: "/master", component: MasterPage }),
                        React.createElement(Route, { component: ComingSoonPage }))))));
    };
    return App;
}(React.Component));
var mapStateToProps = function (_a) {
    var setting = _a.setting;
    return ({
        lang: setting.lang
    });
};
var mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=App.js.map