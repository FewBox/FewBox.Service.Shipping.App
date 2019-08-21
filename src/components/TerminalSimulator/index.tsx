import * as React from 'react';
import * as _ from 'lodash';
import Terminal from 'terminal-in-react';
import { HotKeys } from "react-hotkeys";
import './style.scss';
import { autobind } from 'core-decorators';

export interface ITerminalSimulatorProps {
  msg: string;
  promptSymbol: string;
  websocketUrl: string;
}

const keyMap = {
  STOP_COMMAND: 'ctrl+c'
};

export default class TerminalSimulator extends React.Component<ITerminalSimulatorProps, any> {
  socket: any;
  @autobind
  open() {
    console.log('Terminal open.');
  }
  @autobind
  close(e) {
    this.setState({ isConnected: false });
    console.log('Terminal close.');
  }
  getParsedMessageData(message) {
    let data = _.replace(message, new RegExp('\\[1;34m', 'g'), '');
    data = _.replace(data, new RegExp('\\[1;32m', 'g'), '');
    data = _.replace(data, new RegExp('\\[0;0m', 'g'), '');
    data = _.replace(data, new RegExp('\\[m', 'g'), '');
    let messageSegments = _.split(data, '\r\n');
    this.setState({ promptSymbol: messageSegments[messageSegments.length - 1] });
    if (messageSegments.length >= 3) {
      return messageSegments.filter((messageSegment, index) => index != 0 && index != messageSegments.length - 1).map((messageSegment) => {
        return messageSegment;
      }).join('\r\n');
    }
    else if (messageSegments.pop().indexOf('# ') == -1) {
      return data;
    }
    else {
      return '';
    }
  }
  @autobind
  onmessage(message) {
    if (typeof (message.data) === 'string') {
      let parsedData = this.getParsedMessageData(message.data);
      if (parsedData != '') {
        console.log(parsedData);
      }
    }
    else {
      console.log('Unknow type.');
      console.log(message.data);
    }
  }
  @autobind
  executeCommand(cmd, print) {
    var message = '';
    cmd.map((item) => {
      message += ' ' + item;
    });
    this.socket.send(message);
    //print('Hi');
  }
  @autobind
  stop() {
    this.socket.send('[ctrl+c]');
  }
  componentDidMount()
  {
    this.socket = new WebSocket(this.props.websocketUrl);
    this.socket.onmessage = this.onmessage;
    this.socket.onclose = this.close;
    this.socket.onopen = this.open;
  }
  componentWillUnmount() {
    this.socket.close();
  }
  public render() {
    let handlers = {
      STOP_COMMAND: event => this.stop()
    };
    return (
      <div>
        <HotKeys keyMap={keyMap} handlers={handlers}>
          <Terminal color='green'
            backgroundColor='black'
            barColor='black'
            startState='maximised'
            style={{ fontWeight: "bold", fontSize: "1em" }} msg={this.props.msg} watchConsoleLogging={true} hideTopBar={true} showActions={false}
            promptSymbol={this.props.promptSymbol}
            commandPassThrough={(cmd, print) => this.executeCommand(cmd, print)}
          />
        </HotKeys>
      </div>
    );
  }
}
