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
import Terminal from 'terminal-in-react';
import './style.scss';
var TerminalSimulator = /** @class */ (function (_super) {
    __extends(TerminalSimulator, _super);
    function TerminalSimulator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TerminalSimulator.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(Terminal, { msg: this.props.msg, watchConsoleLogging: true, hideTopBar: true, showActions: false, promptSymbol: this.props.promptSymbol, commandPassThrough: function (cmd, print) { return _this.props.executeCommand(cmd, print); } })));
    };
    return TerminalSimulator;
}(React.Component));
export default TerminalSimulator;
//# sourceMappingURL=index.js.map