import * as React from 'react';
import { connect } from 'react-redux';
import { Store, Contributor } from '../reducers/State';
import { initLandingPage } from '../actions';
import { Row, Col, Statistic, Button } from 'antd';

export interface ILandingPageProps {
  initLandingPage: any;
  contributors: Contributor[];
}

class LandingPage extends React.Component<ILandingPageProps, any> {
  componentDidMount() {
    this.props.initLandingPage();
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="Shipping Lines (Namespaces)" value={15} />
            <Button style={{ marginTop: 16 }} type="primary">
              Go
            </Button>
          </Col>
          <Col span={6}>
            <Statistic title="Fleets (Service)" value={32} />
            <Button style={{ marginTop: 16 }} type="primary">
              Go
            </Button>
          </Col>
        </Row>
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