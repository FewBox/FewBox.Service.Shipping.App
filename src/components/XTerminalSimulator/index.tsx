import * as React from 'react';
import { Terminal } from 'xterm';
import * as fit from 'xterm/dist/addons/fit/fit';
import './style.scss';
import { autobind } from 'core-decorators';

export interface IXTerminalSimulatorProps {
  websocketUrl: string;
  exit: () => void;
}

export default class XTerminalSimulator extends React.Component<IXTerminalSimulatorProps, any> {
  term: any;
  socket: any;
  @autobind
  onopen() {
  }
  @autobind
  onclose() {
    this.term.write('\r\n\r\nBye...');
  }
  @autobind
  onmessage(message) {
    this.term.write(message.data);
  }
  componentDidMount() {
    const props = this.props;
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
      if (socket.readyState === socket.CLOSED) {
        props.exit();
      }
      else {
        socket.send(data);
      }
    });
    this.term.fit();
    this.term.focus();
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
