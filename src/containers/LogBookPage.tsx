import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Store, LogBook } from '../reducers/State';
import { Row, PageHeader } from 'antd';
import { redirect, initLogBook } from '../actions';

export interface ILogBookPageProps {
  logBook: LogBook;
  initLogBook: (any) => void;
  match: any;
  redirect: (path: string) => void;
}

class LogBookPage extends React.Component<ILogBookPageProps, any> {
  componentDidMount() {
    this.props.initLogBook({ namespace: this.props.match.params.namespace, pod: this.props.match.params.pod, container: this.props.match.params.container });
  }
  render() {
    return (
      <div>
        <Row>
          <PageHeader onBack={() => this.props.redirect('/master/containership')} title={<FormattedMessage id="Layout.Back" />} subTitle={<FormattedMessage id='Navigation.ContainerShip' />} />
        </Row>
        <Row>
          {this.props.logBook.content}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ logBookPage }: Store) => ({
  logBook: logBookPage.logBook
});

const mapDispatchToProps = {
  redirect,
  initLogBook
};

export default connect(mapStateToProps, mapDispatchToProps)(LogBookPage);