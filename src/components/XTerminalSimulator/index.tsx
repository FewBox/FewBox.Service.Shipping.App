import * as React from 'react';
import { Terminal } from 'xterm';
import * as fit from 'xterm/dist/addons/fit/fit';
import './style.scss';
import { autobind } from 'core-decorators';

export interface IXTerminalSimulatorProps {
  websocketUrl: string;
}

export default class XTerminalSimulator extends React.Component<IXTerminalSimulatorProps, any> {
  term: any;
  socket: any;
  @autobind
  onopen() {
  }
  @autobind
  onclose() {
    this.term.write('Byte...');
  }
  @autobind
  onmessage(message) {
    this.term.write(message.data);
  }
  componentDidMount() {
    // Init WebSocket
    const socket = new WebSocket(this.props.websocketUrl);
    socket.onmessage = this.onmessage;
    socket.onclose = this.onclose;
    socket.onopen = this.onopen;
    this.socket = socket;
    // Init Terminal
    Terminal.applyAddon(fit);
    let terminalContainer = document.getElementById('xtermialSimulator');
    this.term = new Terminal({ cursorBlink: true });
    this.term.open(terminalContainer);
    this.term.on("data", function (data) {
      socket.send(data);
    });
    this.term.fit();
  }
  componentWillUnmount() {
    this.socket.close();
  }
  public render() {
    return (
      <div id='xtermialSimulator'>
      </div>
    );
  }
}
