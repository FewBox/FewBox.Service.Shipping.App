import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { autobind } from 'core-decorators';
import { Row, PageHeader, Result } from 'antd';
import { redirect } from '../actions';
import { Store } from 'redux';
// @ts-ignore
// import { HOST, PORT } from 'appsettings';
import XTerminalSimulator from '../components/XTerminalSimulator';

export interface ITerminalPageProps {
  match: any;
  redirect: (path: string) => void;
}

class TerminalPage extends React.Component<ITerminalPageProps, any> {

  constructor(props) {
    super(props);
    var websocketUrlCompiled = _.template('wss://${host}:${port}${basePath}/xterminal/api/v1/namespaces/${namespace}/pods/${pod}/exec?command=${command}&stdin=true&stderr=true&stdout=true&tty=true&container=${container}');
    let appsettings = window.localStorage.getItem(`${location.hostname}_shipping_appsettings`);
    const { HOST, PORT, BASEPATH } = JSON.parse(appsettings ? appsettings : '{}');
    console.log(appsettings);
    var websocketUrl = websocketUrlCompiled({
      'host': HOST,
      'port': PORT,
      'basePath': BASEPATH,
      'namespace': this.props.match.params.namespace,
      'pod': this.props.match.params.pod,
      'container': this.props.match.params.container,
      'command': atob(this.props.match.params.command)
    });
    console.log(websocketUrl);
    this.state = { websocketUrl: websocketUrl };
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <PageHeader onBack={() => this.props.redirect('/master/pod')} title={<FormattedMessage id="Label.Back" />} subTitle={<FormattedMessage id='Navigation.Pod' />} />
        </Row>
        <Row gutter={16}>
          <XTerminalSimulator exit={() => this.props.redirect('/master/pod')} websocketUrl={this.state.websocketUrl} />
        </Row>
        {
          //<Row>
          //<TerminalSimulator websocketUrl={this.state.websocketUrl} promptSymbol='#' msg='Wellcome to FewBox' />
          //</Row>
        }
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