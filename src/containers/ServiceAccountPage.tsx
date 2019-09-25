import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initNamespaceDropdownList, initCaptainPage, trainCaptain, fireCaptain } from '../actions';
import CaptainTraining from '../components/ServiceAccountCreation';
import { Store, Captain, Namespace } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IServiceAccountPageProps {
    namespaces: Namespace[];
    captains: Captain[];
    initCaptainPage: () => void;
    trainCaptain: (any) => void;
    fireCaptain: (any) => void;
    initNamespaceDropdownList: () => void;
    isHelp: boolean;
}

class ServiceAccountPage extends React.Component<IServiceAccountPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initCaptainPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <CaptainTraining isHelp={this.props.isHelp} train={this.props.trainCaptain} reload={this.props.initCaptainPage} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.captains}
                        renderItem={(item: Captain) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.fireCaptain({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={
                                        <Descriptions size='small' column={1} bordered>
                                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                                            {item.credentials.map((credential, index) => {
                                                return <Descriptions.Item key={'credential' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.CredentialItem" helpId="Help.Secret" values={{ key: index }} />}>{credential.name}</Descriptions.Item>
                                            })}
                                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>>{item.age}</Descriptions.Item>
                                        </Descriptions>
                                    } />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ captainPage, masterPage, settingPage }: Store) => ({
    captains: captainPage.captains,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initCaptainPage,
    trainCaptain,
    fireCaptain
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAccountPage);