import * as React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Store } from '../reducers/State';
import { Layout, Menu, Icon, Dropdown, Avatar, Skeleton, Switch as ANTD_Switch, message, Drawer, Result } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { Route, Link, Switch } from 'react-router-dom';
import { Redirect, MessageBox, MessageType } from '@fewbox/react-components';
import Loading from '../components/Loading';
import { hideMessage, signOut, clearPath, switchFewBoxDelivery, hideDrawer, changeContainerShipNumbering } from '../actions';
const CountryPage = lazy(() => import('./CountryPage'));
const LandingPage = lazy(() => import('./LandingPage'));
const AboutPage = lazy(() => import('./AboutPage'));
const TerminalPage = lazy(() => import('./TerminalPage'));
const ShippingLinePage = lazy(() => import('./ShippingLinePage'));
const ContainerShipPage = lazy(() => import('./ContainerShipPage'));
const ShipyardPage = lazy(() => import('./ShipyardPage'));
const QuayAreaPage = lazy(() => import('./QuayAreaPage'));
const GateAreaPage = lazy(() => import('./GateAreaPage'));
const LogBookPage = lazy(() => import('./LogBookPage'));
const CaptainPage = lazy(() => import('./CaptainPage'));
const CredentialPage = lazy(() => import('./CredentialPage'));
const YardAreaPage = lazy(() => import('./YardAreaPage'));
const StackPolicyPage = lazy(() => import('./StackPolicyPage'));
const StackPolicyDrawer = lazy(() => import('../components/StackPolicyDrawer'));
const ShipyardDrawer = lazy(() => import('../components/ShipyardDrawer'));
import './MasterPage.scss';
import { ShippingLineIcon, QuayAreaIcon, ShipyardIcon, ContainerShipIcon, GateAreaIcon, LandingIcon, CountryIcon, ReefIcon, BrandIcon, CaptainIcon, CredentialIcon } from '../components/Icon';

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
    drawer: any;
    isFewBoxDelivery: boolean;
    hideMessage: () => void;
    hideDrawer: () => void;
    switchFewBoxDelivery: (boolean) => void;
    changeContainerShipNumbering: (any) => void;
    changeStackPolicySubset: (any) => void;
    intl: any;
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
                    <Link to="/" onClick={this.props.signOut} ><FormattedMessage id="Label.SignOut" /></Link>
                </Menu.Item>
            </Menu>
        );
        let drawer = () => {
            switch (this.props.drawer.type) {
                case 'Shipyard':
                    return <Suspense fallback={<Skeleton active />}><ShipyardDrawer shippingLine={this.props.drawer.shippingLine} name={this.props.drawer.name} cargos={this.props.drawer.cargos} changeContainerShipNumbering={this.props.changeContainerShipNumbering} /></Suspense>
                case 'StackPolicy':
                    return <Suspense fallback={<Skeleton active />}><StackPolicyDrawer shippingLine={this.props.drawer.shippingLine} name={this.props.drawer.name} subsets={this.props.drawer.subsets} changeStackPolicySubset={this.props.changeStackPolicySubset} /></Suspense>
                default:
                    return <div></div>
            }
        };
        let drawerTitle = () => {
            switch (this.props.drawer.type) {
                case 'Shipyard':
                    return this.props.intl.formatMessage({ id: 'Label.Shipyard' });
                case 'StackPolicy':
                    return this.props.intl.formatMessage({ id: 'Label.StackPolicy' });
                default:
                    return this.props.intl.formatMessage({ id: 'Label.None' });
            }
        };
        return (
            <div className="masterPage">
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
                <Loading isVisable={this.props.isLoadingVisible} />
                <MessageBox isVisable={this.props.isMessageVisible} type={this.props.messageType} intlId={this.props.messageIntlId} duration={this.props.messageDuration} values={this.props.messageValues} onClose={() => { this.props.hideMessage(); }} />
                <Drawer title={drawerTitle()} width='50%' placement="right" closable={false} visible={this.props.isDrawerVisible} onClose={this.props.hideDrawer}>
                    {drawer()}
                </Drawer>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                        <div className='logo'>
                            <Avatar size={64} src="/assets/images/logo-green.svg" />
                        </div>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to='/master/landing'><LandingIcon />
                                    <FormattedMessage id="Navigation.Landing" /></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/master/country'><CountryIcon />
                                    <FormattedMessage id="Navigation.Country" /></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to='/master/shippingline'><ShippingLineIcon />
                                    <FormattedMessage id="Navigation.ShippingLine" /></Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to='/master/captain'><CaptainIcon />
                                    <FormattedMessage id="Navigation.Captain" /></Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to='/master/credential'><CredentialIcon />
                                    <FormattedMessage id="Navigation.Credential" /></Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to='/master/quayarea'><QuayAreaIcon />
                                    <FormattedMessage id="Navigation.QuayArea" /></Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to='/master/shipyard'><ShipyardIcon />
                                    <FormattedMessage id="Navigation.Shipyard" /></Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <Link to='/master/containership'><ContainerShipIcon />
                                    <FormattedMessage id="Navigation.ContainerShip" /></Link>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <Link to='/master/gatearea'><GateAreaIcon />
                                    <FormattedMessage id="Navigation.GateArea" /></Link>
                            </Menu.Item>
                            <Menu.Item key="10">
                                <Link to='/master/yardarea'><BrandIcon />
                                    <FormattedMessage id="Navigation.YardArea" /></Link>
                            </Menu.Item>
                            <Menu.Item key="11">
                                <Link to='/master/stackpolicy'><BrandIcon />
                                    <FormattedMessage id="Navigation.StackPolicy" /></Link>
                            </Menu.Item>
                            <Menu.Item key="12">
                                <Link to='/master/about'><Icon type="info-circle" />
                                    <FormattedMessage id="Navigation.About" /></Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                            <ANTD_Switch checkedChildren={<BrandIcon />} checked={this.props.isFewBoxDelivery} unCheckedChildren={<FormattedMessage id='Label.All' />} defaultChecked onChange={(isFewBox) => { this.props.switchFewBoxDelivery(isFewBox); }} />
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#" style={{ float: 'right', marginRight: '20px' }}>
                                    <Avatar icon="user" style={{ marginRight: '5px' }} />
                                    <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Suspense fallback={<Skeleton active />}>
                                <Switch>
                                    <Route path="/master/landing" render={props => <LandingPage {...props} />} />
                                    <Route path="/master/country" render={props => <CountryPage {...props} />} />
                                    <Route path="/master/shippingline" render={props => <ShippingLinePage {...props} />} />
                                    <Route path="/master/captain" render={props => <CaptainPage {...props} />} />
                                    <Route path="/master/credential" render={props => <CredentialPage {...props} />} />
                                    <Route path="/master/containership" render={props => <ContainerShipPage {...props} />} />
                                    <Route path="/master/shipyard" render={props => <ShipyardPage {...props} />} />
                                    <Route path="/master/quayarea" render={props => <QuayAreaPage {...props} />} />
                                    <Route path="/master/gatearea" render={props => <GateAreaPage {...props} />} />
                                    <Route path="/master/yardarea" render={props => <YardAreaPage {...props} />} />
                                    <Route path="/master/stackpolicy" render={props => <StackPolicyPage {...props} />} />
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

const mapStateToProps = ({ masterPage, settingPage }: Store) => ({
    messageType: masterPage.messageType,
    messageIntlId: masterPage.messageIntlId,
    messageValues: masterPage.messageValues,
    messageDuration: masterPage.messageDuration,
    isMessageVisible: masterPage.isMessageVisible,
    isLoadingVisible: masterPage.isLoadingVisible,
    isDrawerVisible: masterPage.isDrawerVisible,
    drawer: masterPage.drawer,
    redirectPath: masterPage.path,
    isFewBoxDelivery: settingPage.isFewBoxDelivery
})

const mapDispatchToProps = {
    hideMessage,
    signOut,
    clearPath,
    switchFewBoxDelivery,
    hideDrawer,
    changeContainerShipNumbering
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MasterPage));