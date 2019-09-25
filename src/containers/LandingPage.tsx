import * as React from 'react';
import { connect } from 'react-redux';
import { Store, ComponentStatus } from '../reducers/State';
import { initLandingPage } from '../actions';
import { Row, Col, Statistic, Button, List, Card, Descriptions, Badge } from 'antd';

export interface ILandingPageProps {
  initLandingPage: any;
  shippingIndustryStatuses: ComponentStatus[];
}

class LandingPage extends React.Component<ILandingPageProps, any> {
  componentDidMount() {
    this.props.initLandingPage();
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.shippingIndustryStatuses}
            renderItem={(item: ComponentStatus) => (
              <List.Item>
                <Card>
                  <p>{item.name}</p>
                  {item.conditions.map((condition, index) => {
                    return <p key={'condition' + index}><Badge color={condition.status === 'True' ? 'green' : 'red'} text={condition.status} /></p>
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
  shippingIndustryStatuses: landingPage.componentStatuses
});

const mapDispatchToProps = {
  initLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);