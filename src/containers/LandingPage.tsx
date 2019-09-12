import * as React from 'react';
import { connect } from 'react-redux';
import { Store, ShippingIndustryStatus } from '../reducers/State';
import { initLandingPage } from '../actions';
import { Row, Col, Statistic, Button, List, Card, Descriptions } from 'antd';

export interface ILandingPageProps {
  initLandingPage: any;
  shippingIndustryStatuses: ShippingIndustryStatus[];
}

class LandingPage extends React.Component<ILandingPageProps, any> {
  componentDidMount() {
    this.props.initLandingPage();
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.shippingIndustryStatuses}
            renderItem={(item: ShippingIndustryStatus) => (
              <List.Item>
                <Card>
                  <p>{item.name}</p>
                  {item.conditions.map((condition, index) => {
                    return <p><p>{condition.type}</p><p>{condition.status}</p><p>{condition.message}</p></p>
                  })}
                </Card>
              </List.Item>
            )}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ landingPage }: Store) => ({
  shippingIndustryStatuses: landingPage.shippingIndustryStatuses
});

const mapDispatchToProps = {
  initLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);