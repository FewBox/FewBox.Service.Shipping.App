import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initNamespaceDropdownList, initServiceAccountPage, createServiceAccount, deleteServiceAccount } from '../actions';
import ServiceAccountCreation from '../components/ServiceAccountCreation';
import { Store, ServiceAccount, Namespace } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IServiceAccountPageProps {
    namespaces: Namespace[];
    serviceAccounts: ServiceAccount[];
    initServiceAccountPage: () => void;
    createServiceAccount: (any) => void;
    deleteServiceAccount: (any) => void;
    initNamespaceDropdownList: () => void;
    isHelp: boolean;
}

class ServiceAccountPage extends React.Component<IServiceAccountPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initServiceAccountPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <ServiceAccountCreation isHelp={this.props.isHelp} train={this.props.createServiceAccount} reload={this.props.initServiceAccountPage} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.serviceAccounts}
                        renderItem={(item: ServiceAccount) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteServiceAccount({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={
                                        <Descriptions size='small' column={1} bordered>
                                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                                            {item.credentials.map((credential, index) => {
                                                return <Descriptions.Item key={'credential' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.SecretItem" helpId="Help.Secret" values={{ key: index }} />}>{credential.name}</Descriptions.Item>
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

const mapStateToProps = ({ serviceAccountPage, masterPage, settingPage }: Store) => ({
    serviceAccounts: serviceAccountPage.serviceAccounts,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initServiceAccountPage,
    createServiceAccount,
    deleteServiceAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceAccountPage);