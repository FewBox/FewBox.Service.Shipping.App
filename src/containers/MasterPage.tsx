import * as React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Store } from '../reducers/State';
import { Layout, Menu, Icon, Dropdown, Avatar, Skeleton, Switch as ANTD_Switch, message } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { Route, Link, Switch } from 'react-router-dom';
import { Redirect, MessageBox, MessageType } from '@fewbox/react-components';
import Loading from '../components/Loading';
import { hideMessage, signOut, clearPath, switchFewBoxDelivery } from '../actions';
const LandingPage = lazy(() => import('./LandingPage'));
const AboutPage = lazy(() => import('./AboutPage'));
const TerminalPage = lazy(() => import('./TerminalPage'));
const ShippingLinePage = lazy(() => import('./ShippingLinePage'));
const ContainerShipPage = lazy(() => import('./ContainerShipPage'));
const ShipyardPage = lazy(() => import('./ShipyardPage'));
const ContainerTerminalPage = lazy(() => import('./ContainerTerminalPage'));
const CustomsPage = lazy(() => import('./CustomsPage'));
const LogBookPage = lazy(() => import('./LogBookPage'));
import './MasterPage.scss';
import { ShippingLineIcon, ContainerTerminalIcon, ShipyardIcon, ContainerShipIcon, CustomsIcon, LandingIcon } from '../components/Icon';

export interface IMasterPageProps {
    signOut: () => void;
    clearPath: () => void;
    redirectPath: (string) => void;
    messageType: MessageType;
    messageIntlId: string;
    messageValues: any;
    messageDuration: number;
    messageIsVisible: boolean;
    loadingIsVisible: boolean;
    isFewBoxDelivery: boolean;
    hideMessage: () => void;
    switchFewBoxOcean: (boolean) => void;
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
        return (
            <div className="masterPage">
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
                <Loading isVisable={this.props.loadingIsVisible} />
                <MessageBox isVisable={this.props.messageIsVisible} type={this.props.messageType} intlId={this.props.messageIntlId} duration={this.props.messageDuration} values={this.props.messageValues} onClose={() => { this.props.hideMessage(); }} />
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
                                <Link to='/master/shippingline'><ShippingLineIcon />
                                    <FormattedMessage id="Navigation.ShippingLine" /></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to='/master/containerterminal'><ContainerTerminalIcon />
                                    <FormattedMessage id="Navigation.ContainerTerminal" /></Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to='/master/shipyard'><ShipyardIcon />
                                    <FormattedMessage id="Navigation.Shipyard" /></Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to='/master/containership'><ContainerShipIcon />
                                    <FormattedMessage id="Navigation.ContainerShip" /></Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to='/master/customs'><CustomsIcon />
                                    <FormattedMessage id="Navigation.Customs" /></Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to='/master/about'><Icon type="info-circle" />
                                    <FormattedMessage id="Navigation.About" /></Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                            <ANTD_Switch checkedChildren={<FormattedMessage id='Label.Brand' />} checked={this.props.isFewBoxDelivery} unCheckedChildren={<FormattedMessage id='Label.All' />} defaultChecked onChange={(isFewBox) => { this.props.switchFewBoxOcean(isFewBox); }} />
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
                                    <Route path="/master/shippingline" render={props => <ShippingLinePage {...props} />} />
                                    <Route path="/master/containership" render={props => <ContainerShipPage {...props} />} />
                                    <Route path="/master/shipyard" render={props => <ShipyardPage {...props} />} />
                                    <Route path="/master/containerterminal" render={props => <ContainerTerminalPage {...props} />} />
                                    <Route path="/master/customs" render={props => <CustomsPage {...props} />} />
                                    <Route path="/master/about" render={props => <AboutPage {...props} />} />
                                    <Route path="/master/terminal/:host/:port/:namespace/:pod/:container" render={props => <TerminalPage {...props} />} />
                                    <Route path="/master/logbook/:namespace/:pod/:container" render={props => <LogBookPage {...props} />} />
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
    messageIsVisible: masterPage.messageIsVisible,
    loadingIsVisible: masterPage.loadingIsVisible,
    redirectPath: masterPage.path,
    isFewBoxDelivery: settingPage.isFewBoxDelivery
})

const mapDispatchToProps = {
    hideMessage,
    signOut,
    clearPath,
    switchFewBoxOcean: switchFewBoxDelivery
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPage);