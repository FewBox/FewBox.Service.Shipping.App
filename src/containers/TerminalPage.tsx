import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { autobind } from 'core-decorators';
import { Row, PageHeader, Result } from 'antd';
import { redirect } from '../actions';
import { Store } from 'redux';
import { HOST, PORT } from '../config';
import XTerminalSimulator from '../components/XTerminalSimulator';

export interface ITerminalPageProps {
  match: any;
  redirect: (path: string) => void;
}

class TerminalPage extends React.Component<ITerminalPageProps, any> {

  constructor(props) {
    super(props);
    var websocketUrlCompiled = _.template('wss://${host}:${port}/xterminal/api/v1/namespaces/${namespace}/pods/${pod}/exec?command=${command}&stdin=true&stderr=true&stdout=true&tty=true&container=${container}');
    var websocketUrl = websocketUrlCompiled({
      'host': HOST,
      'port': PORT,
      'namespace': this.props.match.params.namespace,
      'pod': this.props.match.params.pod,
      'container': this.props.match.params.container,
      'command': atob(this.props.match.params.command)
    });
    this.state = { websocketUrl: websocketUrl };
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <PageHeader onBack={() => this.props.redirect('/master/containership')} title={<FormattedMessage id="Label.Back" />} subTitle={<FormattedMessage id='Navigation.ContainerShip' />} />
        </Row>
        <Row gutter={16}>
          <XTerminalSimulator exit={() => this.props.redirect('/master/containership')} websocketUrl={this.state.websocketUrl} />
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