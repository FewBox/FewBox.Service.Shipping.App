import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { initApp } from '../actions';
// Language
import langs from '../langs';
import { Store } from '../reducers/State';
//import "antd/dist/antd.css";
import "antd/dist/antd.less";
import IntlWrapper from '../components/IntlWrapper';

export interface AppProps {
  initApp: () => void;
  lang: string,
  searchKeyword: any
}

class App extends React.Component<AppProps, any> {
  componentWillMount() {
    this.props.initApp();
  }
  public render() {
    return (
      <IntlProvider locale={'en'} messages={langs(this.props.lang)}>
        <IntlWrapper />
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ settingPage }: Store) => ({
  lang: settingPage.lang
});

const mapDispatchToProps = {
  initApp
}

export default connect(mapStateToProps, mapDispatchToProps)(App);