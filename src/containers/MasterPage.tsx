import * as React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Store, SelectedDestinationRule, SelectedVirtualService, SelectedSecret, SelectedDeployment } from '../reducers/State';
import { Layout, Menu, Icon, Dropdown, Avatar, Skeleton, Switch as ANTD_Switch, message, Drawer, Result, Button } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { Route, Link, Switch } from 'react-router-dom';
import { Redirect, MessageBox, MessageType } from '@fewbox/react-components';
import Loading from '../components/Loading';
import {
    hideMessage, signOut, clearPath, switchFewBoxDelivery, switchHelp, switchEnableDockerRegistry, hideDrawer, changePodVersion, changeDestinationRuleSubset, changeVirtualServiceHttp,
    changeSecretData, showLockWindow, hideLockWindow, initSelectedVirtualServiceDeploymentDropdownList
} from '../actions';
const NodePage = lazy(() => import('./NodePage'));
const LandingPage = lazy(() => import('./LandingPage'));
const AboutPage = lazy(() => import('./AboutPage'));
const ShippingLanePage = lazy(() => import('./ShippingLanePage'));
const ShippingMapPage = lazy(() => import('./ShippingMapPage'));
const TerminalPage = lazy(() => import('./TerminalPage'));
const NamespacePage = lazy(() => import('./NamespacePage'));
const PodPage = lazy(() => import('./PodPage'));
const DeploymentPage = lazy(() => import('./DeploymentPage'));
const ServicePage = lazy(() => import('./ServicePage'));
const GatewayPage = lazy(() => import('./GatewayPage'));
const LogBookPage = lazy(() => import('./LogBookPage'));
const ServiceAccountPage = lazy(() => import('./ServiceAccountPage'));
const SecretPage = lazy(() => import('./SecretPage'));
const VirtualServicePage = lazy(() => import('./VirtualServicePage'));
const DestinationRulePage = lazy(() => import('./DestinationRulePage'));
const ServiceEntryPage = lazy(() => import('./ServiceEntryPage'));
const JobPage = lazy(() => import('./JobPage'));
const DestinationRuleDrawer = lazy(() => import('../components/DestinationRuleDrawer'));
const VirtualServiceDrawer = lazy(() => import('../components/VirtualServiceDrawer'));
const DeploymentDrawer = lazy(() => import('../components/DeploymentDrawer'));
const SecretDrawer = lazy(() => import('../components/SecretDrawer'));
import HelpComponent from '../components/HelpComponent';
import ShowModule from '../util/ShowModule';
import './MasterPage.scss';
import { NamespaceIcon, ServiceIcon, DeploymentIcon, PodIcon, GatewayIcon, LandingIcon, NodeIcon, ReefIcon, BrandIcon, ServiceAccountIcon, SecretIcon, VirtualServiceIcon, DestinationRuleIcon, ServiceEntryIcon, IstioIcon, KubernetesIcon, ShippingLaneIcon, JobIcon, ShippingMapIcon, DockerRegistryIcon } from '../components/Icon';
import LockWindow from '../components/LockWindow';
import { MatchOptions } from '../jsons';

export interface IMasterPageProps {
    signOut: () => void;
    clearPath: () => void;
    redirectPath: (string) => void;
    messageType: MessageType;
    messageIntlId: string;
    messageValues: any;
    messageDuration: number;
    isMessageVisible: boolean;
    isLoadingVisible: boolean;
    isDrawerVisible: boolean;
    isLockWindowVisible: boolean;
    drawer: any;
    isFewBoxDelivery: boolean;
    isHelp: boolean;
    isEnableDockerRegistry: boolean;
    hideMessage: () => void;
    hideDrawer: () => void;
    signIn: (username, password) => void;
    hideLockWindow: () => void;
    switchFewBoxDelivery: (isFewBox: boolean) => void;
    switchHelp: (isHelp: boolean) => void;
    switchEnableDockerRegistry: (isEnableDockerRegistry: boolean) => void;
    changePodVersion: (any) => void;
    changeDestinationRuleSubset: (any) => void;
    changeVirtualServiceHttp: (any) => void;
    changeSecretData: (any) => void;
    initSelectedVirtualServiceDeploymentDropdownList: (app: string) => void;
    initImageDropdownList: () => void;
    intl?: any;
    selectedDestinationRule: SelectedDestinationRule;
    selectedVirtualService: SelectedVirtualService;
    selectedSecret: SelectedSecret;
    selectedDeployment: SelectedDeployment;
}

class MasterPage extends React.Component<IMasterPageProps, any> {
    constructor(props) {
        super(props);
        this.state = { collapsed: false };
    }

    @autobind
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    public render() {
        message.config({ maxCount: 3 });
        const menu = (
            <Menu>
                <Menu.Item>
                    <Button type='link' onClick={this.props.signOut}><FormattedMessage id="Label.SignOut" /></Button>
                </Menu.Item>
                <Menu.Item>
                    <ANTD_Switch checkedChildren={<DockerRegistryIcon />} checked={this.props.isEnableDockerRegistry} unCheckedChildren={<DockerRegistryIcon />} defaultChecked onChange={(isHelp) => { this.props.switchEnableDockerRegistry(isHelp); }} />
                </Menu.Item>
                <Menu.Item>
                    <ANTD_Switch checkedChildren={<Icon type="question-circle" />} checked={this.props.isHelp} unCheckedChildren={<Icon type="question-circle" />} defaultChecked onChange={(isHelp) => { this.props.switchHelp(isHelp); }} />
                </Menu.Item>
            </Menu>
        );
        let drawer = () => {
            switch (this.props.drawer.type) {
                case 'Deployment':
                    return <DeploymentDrawer namespace={this.props.drawer.namespace} name={this.props.drawer.name} selectedDeployment={this.props.selectedDeployment} changePodVersion={this.props.changePodVersion} />;
                case 'DestinationRule':
                    return <DestinationRuleDrawer namespace={this.props.drawer.namespace} name={this.props.drawer.name} selectedDestinationRule={this.props.selectedDestinationRule} changeDestinationRuleSubset={this.props.changeDestinationRuleSubset} />;
                case 'VirtualService':
                    return <VirtualServiceDrawer namespace={this.props.drawer.namespace} name={this.props.drawer.name} selectedVirtualService={this.props.selectedVirtualService} changeVirtualServiceHttp={this.props.changeVirtualServiceHttp} refreshDeployments={this.props.initSelectedVirtualServiceDeploymentDropdownList} matchOptions={MatchOptions} isHelp={this.props.isHelp} />
                case 'Secret':
                    return <SecretDrawer namespace={this.props.drawer.namespace} name={this.props.drawer.name} selectedSecret={this.props.selectedSecret} changeSecretData={this.props.changeSecretData} isHelp={this.props.isHelp} />
                default:
                    return <div></div>
            }
        };
        let drawerTitle = () => {
            switch (this.props.drawer.type) {
                case 'Deployment':
                    return <FormattedMessage id="Label.Deployment" />;
                case 'DestinationRule':
                    return <FormattedMessage id="Label.DestinationRule" />;
                case 'VirtualService':
                    return <FormattedMessage id="Label.VirtualService" />;
                case 'Secret':
                    return <FormattedMessage id="Label.Secret" />;
                default:
                    return <FormattedMessage id="Label.None" />;
            }
        };
        return (
            <div className="masterPage">
                <LockWindow isVisiable={this.props.isLockWindowVisible} signIn={this.props.signIn} close={this.props.hideLockWindow} />
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
                <Loading isVisable={this.props.isLoadingVisible} />
                <Drawer title={drawerTitle()} width='50%' placement="right" closable={false} visible={this.props.isDrawerVisible} onClose={this.props.hideDrawer}>
                    <Suspense fallback={<Skeleton active />}>
                        {drawer()}
                    </Suspense>
                </Drawer>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className='logo'>
                            <Avatar size={64} src="/assets/images/logo-green.svg" />
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                            <Menu.Item key="0">
                                <Link to='/master/landing'><LandingIcon />
                                    <FormattedMessage id="Navigation.Landing" /></Link>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <Link to='/master/shippinglane'><ShippingLaneIcon />
                                    <FormattedMessage id="Navigation.ShippingLane" /></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/master/shippingmap'><ShippingMapIcon />
                                    <FormattedMessage id="Navigation.ShippingMap" /></Link>
                            </Menu.Item>
                            <Menu.SubMenu key='sub1' title={<span><KubernetesIcon /><FormattedMessage id="Navigation.Kubernetes" /></span>}>
                                {ShowModule('M_Shipping_MODULENODE') && <Menu.Item key="11">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Node" />}>
                                        <Link to='/master/node'><NodeIcon />
                                            <FormattedMessage id="Navigation.Node" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULENAMESPACE') && <Menu.Item key="12">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Namespace" />}>
                                        <Link to='/master/namespace'><NamespaceIcon />
                                            <FormattedMessage id="Navigation.Namespace" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULESERVICEACCOUNT') && <Menu.Item key="13">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.ServiceAccount" />}>
                                        <Link to='/master/serviceaccount'><ServiceAccountIcon />
                                            <FormattedMessage id="Navigation.ServiceAccount" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULESECRET') && <Menu.Item key="14">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Secret" />}>
                                        <Link to='/master/secret'><SecretIcon />
                                            <FormattedMessage id="Navigation.Secret" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULESERVICE') && <Menu.Item key="15">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Service" />}>
                                        <Link to='/master/service'><ServiceIcon />
                                            <FormattedMessage id="Navigation.Service" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULEDEPLOYMENT') && <Menu.Item key="16">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Deployment" />}>
                                        <Link to='/master/deployment'><DeploymentIcon />
                                            <FormattedMessage id="Navigation.Deployment" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULEPOD') && <Menu.Item key="17">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Pod" />}>
                                        <Link to='/master/pod'><PodIcon />
                                            <FormattedMessage id="Navigation.Pod" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULEJOB') && <Menu.Item key="18">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Job" />}>
                                        <Link to='/master/job'><JobIcon />
                                            <FormattedMessage id="Navigation.Job" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                            </Menu.SubMenu>
                            <Menu.SubMenu key='sub2' title={<span><IstioIcon /><FormattedMessage id="Navigation.Istio" /></span>}>
                                {ShowModule('M_Shipping_MODULEGATEWAY') && <Menu.Item key="21">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Gateway" />}>
                                        <Link to='/master/gateway'><GatewayIcon />
                                            <FormattedMessage id="Navigation.Gateway" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULEVIRTUALSERVICE') && <Menu.Item key="22">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.VirtualService" />}>
                                        <Link to='/master/virtualservice'><VirtualServiceIcon />
                                            <FormattedMessage id="Navigation.VirtualService" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULEDESTINATIONRULE') && <Menu.Item key="23">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.DestinationRule" />}>
                                        <Link to='/master/destinationrule'><DestinationRuleIcon />
                                            <FormattedMessage id="Navigation.DestinationRule" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                                {ShowModule('M_Shipping_MODULESERVICEENTRY') && <Menu.Item key="24">
                                    <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.ServiceEntry" />}>
                                        <Link to='/master/serviceentry'><ServiceEntryIcon />
                                            <FormattedMessage id="Navigation.ServiceEntry" /></Link>
                                    </HelpComponent>
                                </Menu.Item>}
                            </Menu.SubMenu>
                            <Menu.Item key="3">
                                <Link to='/master/about'><Icon type="info-circle" />
                                    <FormattedMessage id="Navigation.About" /></Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                            <ANTD_Switch checkedChildren={<BrandIcon />} checked={this.props.isFewBoxDelivery} unCheckedChildren={<BrandIcon />} defaultChecked onChange={(isFewBox) => { this.props.switchFewBoxDelivery(isFewBox); }} />
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" style={{ float: 'right', marginRight: '20px' }}>
                                    <Avatar icon="user" style={{ marginRight: '5px' }} />
                                    <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Suspense fallback={<Skeleton active />}>
                                <Switch>
                                    <Route path="/master/landing" render={props => <LandingPage {...props} />} />
                                    <Route path="/master/shippinglane" render={props => <ShippingLanePage {...props} />} />
                                    <Route path="/master/shippingmap" render={props => <ShippingMapPage {...props} />} />
                                    <Route path="/master/node" render={props => <NodePage {...props} />} />
                                    <Route path="/master/namespace" render={props => <NamespacePage {...props} />} />
                                    <Route path="/master/serviceaccount" render={props => <ServiceAccountPage {...props} />} />
                                    <Route path="/master/secret" render={props => <SecretPage {...props} />} />
                                    <Route path="/master/pod" render={props => <PodPage {...props} />} />
                                    <Route path="/master/deployment" render={props => <DeploymentPage {...props} />} />
                                    <Route path="/master/service" render={props => <ServicePage {...props} />} />
                                    <Route path="/master/job" render={props => <JobPage {...props} />} />
                                    <Route path="/master/gateway" render={props => <GatewayPage {...props} />} />
                                    <Route path="/master/virtualservice" render={props => <VirtualServicePage {...props} />} />
                                    <Route path="/master/destinationrule" render={props => <DestinationRulePage {...props} />} />
                                    <Route path="/master/serviceentry" render={props => <ServiceEntryPage {...props} />} />
                                    <Route path="/master/about" render={props => <AboutPage {...props} />} />
                                    <Route path="/master/terminal/:namespace/:pod/:container/:command" render={props => <TerminalPage {...props} />} />
                                    <Route path="/master/logbook/:namespace/:pod/:container" render={props => <LogBookPage {...props} />} />
                                    <Route component={() => <Result status='error' icon={<ReefIcon />} title={<FormattedMessage id="Message.404" />} subTitle={<FormattedMessage id="Message.404Caption" />} />} />
                                </Switch>
                            </Suspense>
                        </Content>
                        <Footer><FormattedMessage id="Label.Copyright" /></Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = ({ masterPage, settingPage, destinationRulePage, virtualServicePage, secretPage, deploymentPage }: Store) => ({
    messageType: masterPage.messageType,
    messageIntlId: masterPage.messageIntlId,
    messageValues: masterPage.messageValues,
    messageDuration: masterPage.messageDuration,
    isMessageVisible: masterPage.isMessageVisible,
    isLoadingVisible: masterPage.isLoadingVisible,
    isDrawerVisible: masterPage.isDrawerVisible,
    isLockWindowVisible: masterPage.isLockWindowVisible,
    drawer: masterPage.drawer,
    redirectPath: masterPage.path,
    selectedDestinationRule: destinationRulePage.selectedDestinationRule,
    selectedVirtualService: virtualServicePage.selectedVirtualService,
    selectedSecret: secretPage.selectedSecret,
    selectedDeployment: deploymentPage.selectedDeployment,
    isFewBoxDelivery: settingPage.isFewBoxDelivery,
    isHelp: settingPage.isHelp,
    isEnableDockerRegistry: settingPage.isEnableDockerRegistry
})

const mapDispatchToProps = {
    hideMessage,
    signOut,
    clearPath,
    switchFewBoxDelivery,
    switchHelp,
    switchEnableDockerRegistry,
    hideDrawer,
    changePodVersion,
    changeDestinationRuleSubset,
    changeVirtualServiceHttp,
    changeSecretData,
    hideLockWindow,
    showLockWindow,
    initSelectedVirtualServiceDeploymentDropdownList
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPage);