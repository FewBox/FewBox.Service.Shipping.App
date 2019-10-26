import * as React from 'react';
import { connect } from 'react-redux';
import { Store, ComponentStatus, ApiVersions } from '../reducers/State';
import { initLandingPage } from '../actions';
import { Row, Col, Statistic, Button, List, Card, Descriptions, Badge } from 'antd';
import { FormattedMessage } from 'react-intl';
import Item from 'antd/lib/list/Item';

export interface ILandingPageProps {
  initLandingPage: any;
  componentStatuses: ComponentStatus[];
  apiVersions: ApiVersions;
}

class LandingPage extends React.Component<ILandingPageProps, any> {
  componentDidMount() {
    this.props.initLandingPage();
  }
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Descriptions title={<FormattedMessage id='Label.ApiVersions' />}>
            <Descriptions.Item label={<FormattedMessage id='Label.Version' />}>{this.props.apiVersions.versions.map((version, index) => {
              return <span>{version}</span>;
            })}</Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.ServerAddressByClientCIDR' />}>{this.props.apiVersions.serverAddressByClientCIDRs.map((serverAddressByClientCIDR, index) => {
              return <span>{serverAddressByClientCIDR.serverAddress}-{serverAddressByClientCIDR.clientCIDR}</span>;
            })}</Descriptions.Item>
          </Descriptions>
        </Row>
        <Row gutter={16}>
          <Descriptions title={<FormattedMessage id='Label.ComponentStatus' />}>
            {this.props.componentStatuses.map((componentStatus: ComponentStatus, index) => {
              return <Descriptions.Item label={componentStatus.name}>{componentStatus.conditions.map((condition, index) => {
                return <p key={'condition' + index}><Badge color={condition.status === 'True' ? 'green' : 'red'} text={condition.status} /></p>
              })}</Descriptions.Item>
            })}
          </Descriptions>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ landingPage }: Store) => ({
  componentStatuses: landingPage.componentStatuses,
  apiVersions: landingPage.apiVersions
});

const mapDispatchToProps = {
  initLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);