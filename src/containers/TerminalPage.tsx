import * as React from 'react';
import * as _ from 'lodash';
import { autobind } from 'core-decorators';
import TerminalSimulator from '../components/TerminalSimulator';

export interface ITerminalPageProps {
  match: any;
}

class TerminalPage extends React.Component<ITerminalPageProps, any> {
  socket: any;
  componentDidMount()
  {
    var websocketUrlCompiled = _.template('wss://${host}:${port}/terminal/api/v1/namespaces/${namespace}/pods/${pod}/exec?command=/bin/bash&stdin=true&stderr=true&stdout=true&tty=true&container=${container}');
    var websocketUrl = websocketUrlCompiled({ 
      'host': this.props.match.params.host,
      'port': this.props.match.params.port,
      'namespace': this.props.match.params.namespace,
      'pod': this.props.match.params.pod,
      'container': this.props.match.params.container
    });
    this.socket = new WebSocket(websocketUrl);
    this.socket.onmessage = this.handleMessage;
    this.socket.onclose = this.close;
    this.socket.onopen = this.open;
  }
  @autobind
  open() {
    console.log('Socket open.');
  }
  @autobind
  close() {
    console.log('Socket close.');
  }
  @autobind
  handleMessage(message) {
    if(typeof(message.data)==='string')
    {
      console.log(message.data);
    }
    else if(typeof(message.data)==='object')
    {
      console.log(message.data);
    }
  }
  @autobind
  executeCommand(cmd, print) {
    this.socket.send(cmd);
    //print('Hi');
  }
  render() {
    return (
      <div>
        <TerminalSimulator msg='Wellcome to FewBox' executeCommand={this.executeCommand} />
      </div>
    );
  }
}

export default TerminalPage;