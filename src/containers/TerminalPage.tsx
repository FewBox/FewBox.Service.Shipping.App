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
    this.state = { promptSymbol: null };
    var websocketUrlCompiled = _.template('wss://${host}:${port}/terminal/api/v1/namespaces/${namespace}/pods/${pod}/exec?command=/bin/bash&stdin=true&stderr=true&stdout=true&tty=true&container=${container}');
    var websocketUrl = websocketUrlCompiled({
      'host': HOST,
      'port': PORT,
      'namespace': this.props.match.params.namespace,
      'pod': this.props.match.params.pod,
      'container': this.props.match.params.container
    });
    this.socket = new WebSocket(websocketUrl);
    this.socket.onmessage = this.handleMessage;
    this.socket.onclose = this.close;
    this.socket.onopen = this.open;
  }
  socket: any;
  componentDidMount() {

  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.promptSymbol === null) {
      return true;
    }
    else {
      return false;
    }
  }
  @autobind
  open() {
    console.log('Terminal open.');
  }
  @autobind
  close(e) {
    console.log('Terminal close.');
  }
  @autobind
  handleMessage(message) {
    if (typeof (message.data) === 'string' && message.data != '') {
      var messageSegments = _.split(message.data, '\r\n');
      if (messageSegments.length === 1) {
        if (_.endsWith(messageSegments[0], '# ')) {
          this.setState({ promptSymbol: _.trim(messageSegments[0]) });
        }
        else { }
      }
      else if (messageSegments.length > 1) {
        messageSegments.map((messageSegment, index) => {
          if (index != 0 && messageSegment != '' && !_.endsWith(messageSegment, '# ')) {
            console.log(messageSegment);
          }
          else {
            if (_.endsWith(messageSegments[1], '# ')) {
              this.setState({ promptSymbol: _.trim(messageSegments[1]) });
            }
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
  render() {
    let terminalSimulator;
    if (this.state.promptSymbol) {
      terminalSimulator = <TerminalSimulator promptSymbol={this.state.promptSymbol} msg='Wellcome to FewBox' executeCommand={this.executeCommand} />;
    }
    else{
      terminalSimulator = <Result status='error' icon={<CrashIcon />} title={<FormattedMessage id="Message.Crush" />} subTitle={<FormattedMessage id="Message.CrushCaption" />} />
    }
    return (
      <div>
        <Row>
          <PageHeader onBack={() => this.props.redirect('/master/containership')} title={<FormattedMessage id="Label.Back" />} subTitle={<FormattedMessage id='Navigation.ContainerShip' />} />
        </Row>
        <Row>
          {terminalSimulator}
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