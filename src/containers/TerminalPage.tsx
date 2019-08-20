import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { autobind } from 'core-decorators';
import TerminalSimulator from '../components/TerminalSimulator';
import { Row, PageHeader, Result } from 'antd';
import { redirect } from '../actions';
import { Store } from 'redux';
import { HOST, PORT } from '../config';
import { CrashIcon } from '../components/Icon';

export interface ITerminalPageProps {
  match: any;
  redirect: (path: string) => void;
}

class TerminalPage extends React.Component<ITerminalPageProps, any> {
  constructor(props) {
    super(props);
    this.state = { promptSymbol: '#' };
    var websocketUrlCompiled = _.template('wss://${host}:${port}/terminal/api/v1/namespaces/${namespace}/pods/${pod}/exec?command=${command}&stdin=true&stderr=true&stdout=true&tty=true&container=${container}');
    var websocketUrl = websocketUrlCompiled({
      'host': HOST,
      'port': PORT,
      'namespace': this.props.match.params.namespace,
      'pod': this.props.match.params.pod,
      'container': this.props.match.params.container,
      'command': atob(this.props.match.params.command)
    });
    this.socket = new WebSocket(websocketUrl);
    this.socket.onmessage = this.handleMessage;
    this.socket.onclose = this.close;
    this.socket.onopen = this.open;
  }
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
  handleMessage(message) {
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
  stop(){
    this.socket.send('[ctrl+c]');
  }
  render() {
    return (
      <div>
        <Row>
          <PageHeader onBack={() => this.props.redirect('/master/containership')} title={<FormattedMessage id="Label.Back" />} subTitle={<FormattedMessage id='Navigation.ContainerShip' />} />
        </Row>
        <Row>
          <TerminalSimulator stop={this.stop} promptSymbol={this.state.promptSymbol} msg='Wellcome to FewBox' executeCommand={this.executeCommand} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ }: Store) => ({
})

const mapDispatchToProps = {
  redirect
}

export default connect(mapStateToProps, mapDispatchToProps)(TerminalPage);