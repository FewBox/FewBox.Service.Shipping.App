import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// Language
import langs from '../langs';
// Page
import ComingSoonPage from './ComingSoonPage';
import SignInPage from './SignInPage';
import MasterPage from './MasterPage';
import { Store } from '../reducers/State';
//import "antd/dist/antd.css";
import "antd/dist/antd.less";

export interface AppProps {
  lang : string,
  searchKeyword: any
}

class App extends React.Component<AppProps, any> {
  public render() {
    return (
        <IntlProvider locale={'en'} messages={langs(this.props.lang)}>
        <Router>      
          <div>
            <Switch>
              <Route exact path="/" component={SignInPage} />
              <Route exact path="/signin" component={SignInPage} />
              <Route path="/master" component={MasterPage} />
              <Route component={ComingSoonPage} />
            </Switch>
          </div>
        </Router>
        </IntlProvider> 
    );
  }
}

const mapStateToProps = ({setting}: Store) => ({
    lang: setting.lang
  });
  
  const mapDispatchToProps = {
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(App);