import * as React from 'react';
import { connect } from 'react-redux';
import { Store, Contributor } from '../reducers/State';
import { initLandingPage } from '../actions';

export interface ILandingPageProps {
  initLandingPage: any;
  contributors: Contributor[];
}

class LandingPage extends React.Component<ILandingPageProps, any> {
  componentDidMount(){
    this.props.initLandingPage();
  }
  render() {
    var contributorsElement = this.props.contributors.map((contributor, index)=>{
      return <div key={'contributor-' + index}>{contributor.name}</div>;
    });
    return (
      <div>
          Landing
          {contributorsElement}
      </div>
    );
  }
}

const mapStateToProps = ({ landingPage }: Store) => ({
  contributors: landingPage.contributors
});

const mapDispatchToProps = {
  initLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);