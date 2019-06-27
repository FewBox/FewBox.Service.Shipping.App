import * as React from 'react';
import { Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { FormattedMessage } from 'react-intl';
import { Store, MessageType } from '../reducers/State';
import { Layout, Menu, Icon, Dropdown, Avatar, Button } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import { Route, Link, Switch } from 'react-router-dom';
import { Redirect } from 'fewbox-react-components';
import { hideMessage, signOut, clearPath } from '../actions';
import './MasterPage.scss';
//import LandingPage from './LandingPage';
const LandingPage = lazy(() => import('./LandingPage'));
const AboutPage = lazy(() => import('./AboutPage'));
const TerminalPage = lazy(() => import('./TerminalPage'));

export interface IMasterPageProps {
    messageType: MessageType;
    messageIntlId: string;
    messageContent: string;
    isMessageVisiable: boolean;
    hideMessage: any;
    signOut: any;
    clearPath: any;
    redirectPath: string;
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
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/" onClick={this.props.signOut} ><FormattedMessage id="Layout.SignOut" /></Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="masterPage">
                <Redirect path={this.props.redirectPath} clearPath={this.props.clearPath} />
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <Link to='/master/landing'><Icon type="home" />
                                    <FormattedMessage id="Navigation.Landing" /></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/master/terminal/localhost/5001/fewbox-staging/auth-deployment-latest-c56c67c8-vj7ph/auth'><Icon type="code" />
                                    <FormattedMessage id="Navigation.Terminal" /></Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to='/master/about'><Icon type="info-circle" />
                                    <FormattedMessage id="Navigation.About" /></Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" href="#" style={{ float: 'right', marginRight: '20px' }}>
                                    <Avatar icon="user" style={{ marginRight: '5px' }} />
                                    <Icon type="down" />
                                </a>
                            </Dropdown>
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Route path="/master/landing" render={props => <LandingPage {...props} />} />
                                    <Route path="/master/about" render={props => <AboutPage {...props} />} />
                                    <Route path="/master/terminal/:host/:port/:namespace/:pod/:container" render={props => <TerminalPage {...props} />} />
                                </Switch>
                            </Suspense>
                        </Content>
                        <Footer><FormattedMessage id="Layout.Copyright" /></Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = ({ master }: Store) => ({
    messageContent: master.message.content,
    messageType: master.message.type,
    messageIntlId: master.message.intlId,
    isMessageVisiable: master.isMessageVisiable,
    redirectPath: master.path
})

const mapDispatchToProps = {
    hideMessage,
    signOut,
    clearPath
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPage);