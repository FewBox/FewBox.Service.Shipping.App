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
import { FormattedMessage } from 'react-intl';
import { Card, Icon, Row, Col, Popconfirm, Switch } from 'antd';
import { initShippingLanePage, closeShippingLane, enableIstio, disableIstio } from '../actions';
var ShippingLanePage = /** @class */ (function (_super) {
    __extends(ShippingLanePage, _super);
    function ShippingLanePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShippingLanePage.prototype.componentDidMount = function () {
        this.props.initShippingLanePage();
    };
    ShippingLanePage.prototype.render = function () {
        var _this = this;
        var cols = [];
        var shippingLaneCount = this.props.shippingLanes.length;
        var shippingLanes = this.props.shippingLanes.map(function (item, index) {
            cols.push(React.createElement(Col, { key: "ShippingLane" + index, span: 8 },
                React.createElement(Card, { actions: [
                        React.createElement(Popconfirm, { title: React.createElement(FormattedMessage, { id: "Confirm.DeleteShippingLane" }), onConfirm: function () { _this.props.closeShippingLane(item.name); }, okText: React.createElement(FormattedMessage, { id: "Layout.OK" }), cancelText: React.createElement(FormattedMessage, { id: "Layout.Cancel" }) },
                            React.createElement(Icon, { type: "delete" })),
                        React.createElement(Switch, { onChange: function (checked) { if (checked) {
                                _this.props.enableIstio(item.name);
                            }
                            else {
                                _this.props.disableIstio(item.name);
                            } }, checked: item.isIstioInjected }),
                        React.createElement(Icon, { type: "ellipsis" })
                    ] },
                    React.createElement(Card.Meta, { title: item.name, description: item.name }))));
            if (index % 3 === 2 || index === shippingLaneCount - 1) {
                var value = React.createElement(Row, { key: "ShippingLaneRow" + index, gutter: 16 }, cols.map(function (item, index) { return item; }));
                cols = [];
                return value;
            }
        });
        return (React.createElement("div", null, shippingLanes));
    };
    return ShippingLanePage;
}(React.Component));
var mapStateToProps = function (_a) {
    var shippingLane = _a.shippingLane;
    return ({
        shippingLanes: shippingLane.shippingLanes
    });
};
var mapDispatchToProps = {
    initShippingLanePage: initShippingLanePage,
    closeShippingLane: closeShippingLane,
    enableIstio: enableIstio,
    disableIstio: disableIstio
};
export default connect(mapStateToProps, mapDispatchToProps)(ShippingLanePage);
//# sourceMappingURL=ShippingLanePage.js.map