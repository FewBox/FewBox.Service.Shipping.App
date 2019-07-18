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
import { connect } from 'react-redux';
import { initLandingPage } from '../actions';
var LandingPage = /** @class */ (function (_super) {
    __extends(LandingPage, _super);
    function LandingPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LandingPage.prototype.componentDidMount = function () {
        this.props.initLandingPage();
    };
    LandingPage.prototype.render = function () {
        var contributorsElement = this.props.contributors.map(function (contributor, index) {
            return React.createElement("div", { key: 'contributor-' + index }, contributor.name);
        });
        return (React.createElement("div", null,
            "Landing",
            contributorsElement));
    };
    return LandingPage;
}(React.Component));
var mapStateToProps = function (_a) {
    var landing = _a.landing;
    return ({
        contributors: landing.contributors
    });
};
var mapDispatchToProps = {
    initLandingPage: initLandingPage
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
//# sourceMappingURL=LandingPage.js.map