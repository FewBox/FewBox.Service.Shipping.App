import * as React from 'react';
import { connect } from 'react-redux';
import { Store, ComponentStatus, ApiVersions, Healthz } from '../reducers/State';
import { initLandingPage } from '../actions';
import { Row, Col, Statistic, Button, List, Card, Descriptions, Badge, Progress } from 'antd';
import { FormattedMessage } from 'react-intl';

export interface ILandingPageProps {
  initLandingPage: any;
  componentStatuses: ComponentStatus[];
  apiVersions: ApiVersions;
  healthz: Healthz;
  healthzAutoRegisterCompletion: Healthz;
  healthzEtcd: Healthz;
  healthzLog: Healthz;
  healthzPing: Healthz;
  healthzPoststarthook_ApiserviceOpenapiController: Healthz;
  healthzPoststarthook_ApiserviceRegistrationController: Healthz;
  healthzPoststarthook_ApiserviceStatusAvailableController: Healthz;
  healthzPoststarthook_BootstrapController: Healthz;
  healthzPoststarthook_CARegistration: Healthz;
  healthzPoststarthook_GenericApiserverStartInformers: Healthz;
  healthzPoststarthook_KubeApiserverAutoregistration: Healthz;
  healthzPoststarthook_Rbac_BootstrapRoles: Healthz;
  healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses: Healthz;
  healthzPoststarthook_StartApiextensionsControllers: Healthz;
  healthzPoststarthook_StartApiextensionsInformers: Healthz;
  healthzPoststarthook_StartKubeAggregatorInformers: Healthz;
  healthzPoststarthook_StartKubeApiserverAdmissionInitializer: Healthz;
  isDashboardLoading: boolean;
}

class LandingPage extends React.Component<ILandingPageProps, any> {
  componentDidMount() {
    this.props.initLandingPage();
  }
  render() {
    return (
      <div>
        {/*<Progress percent={100} size="small" status="active" showInfo={false} />*/}
        <Row gutter={16}>
          <Descriptions title={<FormattedMessage id='Label.ApiVersions' />}>
            <Descriptions.Item label={<FormattedMessage id='Label.Version' />}>{this.props.apiVersions.versions.map((version, index) => {
              return <span key={`version${index}`}>{version}</span>;
            })}</Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.ServerAddressByClientCIDR' />}>{this.props.apiVersions.serverAddressByClientCIDRs.map((serverAddressByClientCIDR, index) => {
              return <span key={`serverAddressByClientCIDR${index}`}>{serverAddressByClientCIDR.serverAddress} - {serverAddressByClientCIDR.clientCIDR}</span>;
            })}</Descriptions.Item>
          </Descriptions>
        </Row>
        <Row gutter={16}>
          <Descriptions title={<FormattedMessage id='Label.ComponentStatus' />}>
            {this.props.componentStatuses.map((componentStatus: ComponentStatus, index) => {
              return <Descriptions.Item key={`componentStatus${index}`} label={componentStatus.name}>{componentStatus.conditions.map((condition, index) => {
                return <p key={`condition${index}`}><Badge color={condition.status === 'True' ? 'green' : 'red'} text={condition.status} /></p>
              })}</Descriptions.Item>
            })}
          </Descriptions>
        </Row>
        <Row gutter={16}>
          <Descriptions title={<FormattedMessage id='Label.Healthz' />}>
            <Descriptions.Item label={<FormattedMessage id='Label.Healthz' />}><Badge color={this.props.healthz.content === 'ok' ? 'green' : 'red'} text={this.props.healthz.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.AutoRegisterCompletion' />}><Badge color={this.props.healthzAutoRegisterCompletion.content === 'ok' ? 'green' : 'red'} text={this.props.healthzAutoRegisterCompletion.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Etcd' />}><Badge color={this.props.healthzEtcd.content === 'ok' ? 'green' : 'red'} text={this.props.healthzEtcd.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Log' />}><Badge color={this.props.healthzLog.content === 'ok' ? 'green' : 'red'} text={this.props.healthzLog.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Ping' />}><Badge color={this.props.healthzPing.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPing.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_ApiserviceOpenapiController' />}><Badge color={this.props.healthzPoststarthook_ApiserviceOpenapiController.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_ApiserviceOpenapiController.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_ApiserviceRegistrationController' />}><Badge color={this.props.healthzPoststarthook_ApiserviceRegistrationController.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_ApiserviceRegistrationController.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_ApiserviceStatusAvailableController' />}><Badge color={this.props.healthzPoststarthook_ApiserviceStatusAvailableController.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_ApiserviceStatusAvailableController.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_BootstrapController' />}><Badge color={this.props.healthzPoststarthook_BootstrapController.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_BootstrapController.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_CARegistration' />}><Badge color={this.props.healthzPoststarthook_CARegistration.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_CARegistration.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_GenericApiserverStartInformers' />}><Badge color={this.props.healthzPoststarthook_GenericApiserverStartInformers.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_GenericApiserverStartInformers.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_KubeApiserverAutoregistration' />}><Badge color={this.props.healthzPoststarthook_KubeApiserverAutoregistration.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_KubeApiserverAutoregistration.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_Rbac_BootstrapRoles' />}><Badge color={this.props.healthzPoststarthook_Rbac_BootstrapRoles.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_Rbac_BootstrapRoles.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_Rbacscheduling_BootstrapSystemPriorityClasses' />}><Badge color={this.props.healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_StartApiextensionsControllers' />}><Badge color={this.props.healthzPoststarthook_StartApiextensionsControllers.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_StartApiextensionsControllers.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_StartApiextensionsInformers' />}><Badge color={this.props.healthzPoststarthook_StartApiextensionsInformers.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_StartApiextensionsInformers.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_StartKubeAggregatorInformers' />}><Badge color={this.props.healthzPoststarthook_StartKubeAggregatorInformers.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_StartKubeAggregatorInformers.content} /></Descriptions.Item>
            <Descriptions.Item label={<FormattedMessage id='Label.Poststarthook_StartKubeApiserverAdmissionInitializer' />}><Badge color={this.props.healthzPoststarthook_StartKubeApiserverAdmissionInitializer.content === 'ok' ? 'green' : 'red'} text={this.props.healthzPoststarthook_StartKubeApiserverAdmissionInitializer.content} /></Descriptions.Item>
          </Descriptions>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ landingPage }: Store) => ({
  componentStatuses: landingPage.componentStatuses,
  apiVersions: landingPage.apiVersions,
  healthz: landingPage.healthz,
  healthzAutoRegisterCompletion: landingPage.healthzAutoRegisterCompletion,
  healthzEtcd: landingPage.healthzEtcd,
  healthzLog: landingPage.healthzLog,
  healthzPing: landingPage.healthzPing,
  healthzPoststarthook_ApiserviceOpenapiController: landingPage.healthzPoststarthook_ApiserviceOpenapiController,
  healthzPoststarthook_ApiserviceRegistrationController: landingPage.healthzPoststarthook_ApiserviceRegistrationController,
  healthzPoststarthook_ApiserviceStatusAvailableController: landingPage.healthzPoststarthook_ApiserviceStatusAvailableController,
  healthzPoststarthook_BootstrapController: landingPage.healthzPoststarthook_BootstrapController,
  healthzPoststarthook_CARegistration: landingPage.healthzPoststarthook_CARegistration,
  healthzPoststarthook_GenericApiserverStartInformers: landingPage.healthzPoststarthook_GenericApiserverStartInformers,
  healthzPoststarthook_KubeApiserverAutoregistration: landingPage.healthzPoststarthook_KubeApiserverAutoregistration,
  healthzPoststarthook_Rbac_BootstrapRoles: landingPage.healthzPoststarthook_Rbac_BootstrapRoles,
  healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses: landingPage.healthzPoststarthook_Rbacscheduling_BootstrapSystemPriorityClasses,
  healthzPoststarthook_StartApiextensionsControllers: landingPage.healthzPoststarthook_StartApiextensionsControllers,
  healthzPoststarthook_StartApiextensionsInformers: landingPage.healthzPoststarthook_StartApiextensionsInformers,
  healthzPoststarthook_StartKubeAggregatorInformers: landingPage.healthzPoststarthook_StartKubeAggregatorInformers,
  healthzPoststarthook_StartKubeApiserverAdmissionInitializer: landingPage.healthzPoststarthook_StartKubeApiserverAdmissionInitializer,
  isDashboardLoading: landingPage.isDashboardLoading
});

const mapDispatchToProps = {
  initLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);