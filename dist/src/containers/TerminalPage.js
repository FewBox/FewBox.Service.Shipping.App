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
import * as _ from 'lodash';
import { autobind } from 'core-decorators';
import TerminalSimulator from '../components/TerminalSimulator';
var TerminalPage = /** @class */ (function (_super) {
    __extends(TerminalPage, _super);
    function TerminalPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { promptSymbol: null };
        var websocketUrlCompiled = _.template('wss://${host}:${port}/terminal/api/v1/namespaces/${namespace}/pods/${pod}/exec?command=/bin/bash&stdin=true&stderr=true&stdout=true&tty=true&container=${container}');
        var websocketUrl = websocketUrlCompiled({
            'host': _this.props.match.params.host,
            'port': _this.props.match.params.port,
            'namespace': _this.props.match.params.namespace,
            'pod': _this.props.match.params.pod,
            'container': _this.props.match.params.container
        });
        _this.socket = new WebSocket(websocketUrl);
        _this.socket.onmessage = _this.handleMessage;
        _this.socket.onclose = _this.close;
        _this.socket.onopen = _this.open;
        return _this;
    }
    TerminalPage.prototype.componentDidMount = function () {
    };
    TerminalPage.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        if (this.state.promptSymbol === null) {
            return true;
        }
        else {
            return false;
        }
    };
    TerminalPage.prototype.open = function () {
        console.log('Terminal open.');
    };
    TerminalPage.prototype.close = function () {
        console.log('Terminal close.');
    };
    TerminalPage.prototype.handleMessage = function (message) {
        if (typeof (message.data) === 'string' && message.data != '') {
            var messageSegments = _.split(message.data, '\r\n');
            if (messageSegments.length === 1) {
                if (_.endsWith(messageSegments[0], '# ')) {
                    this.setState({ promptSymbol: _.trim(messageSegments[0]) });
                }
                else { }
            }
            else if (messageSegments.length > 1) {
                messageSegments.map(function (messageSegment, index) {
                    if (index != 0 && messageSegment != '' && !_.endsWith(messageSegment, '# ')) {
                        console.log(messageSegment);
                    }
                });
            }
            else {
                console.log('Not implement');
            }
        }
        else if (typeof (message.data) === 'object') {
            console.log(message.data);
        }
    };
    TerminalPage.prototype.executeCommand = function (cmd, print) {
        var message = '';
        cmd.map(function (item) {
            message += ' ' + item;
        });
        this.socket.send(message);
        //print('Hi');
    };
    TerminalPage.prototype.render = function () {
        var terminalSimulator;
        if (this.state.promptSymbol) {
            terminalSimulator = React.createElement(TerminalSimulator, { promptSymbol: this.state.promptSymbol, msg: 'Wellcome to FewBox', executeCommand: this.executeCommand });
        }
        return (React.createElement("div", null, terminalSimulator));
    };
    __decorate([
        autobind
    ], TerminalPage.prototype, "open", null);
    __decorate([
        autobind
    ], TerminalPage.prototype, "close", null);
    __decorate([
        autobind
    ], TerminalPage.prototype, "handleMessage", null);
    __decorate([
        autobind
    ], TerminalPage.prototype, "executeCommand", null);
    return TerminalPage;
}(React.Component));
export default TerminalPage;
//# sourceMappingURL=TerminalPage.js.map