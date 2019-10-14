import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initNamespaceDropdownList, initServiceAccountPage, createServiceAccount, deleteServiceAccount } from '../actions';
import ServiceAccountCreation from '../components/ServiceAccountCreation';
import { Store, ServiceAccount, Namespace } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import ResourcesCard from '../components/ResourcesCard';

export interface IServiceAccountPageProps {
    namespaces: Namespace[];
    serviceAccounts: ServiceAccount[];
    initServiceAccountPage: () => void;
    createServiceAccount: (any) => void;
    deleteServiceAccount: (any) => void;
    initNamespaceDropdownList: () => void;
    isHelp: boolean;
    isListLoading: boolean;
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
                    <ServiceAccountCreation isHelp={this.props.isHelp} create={this.props.createServiceAccount} reload={this.props.initServiceAccountPage} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.serviceAccounts}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteServiceAccount({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                            <Icon type="help" />,
                            <Icon type="ellipsis" />]}
                        renderBasic={(item) => <Descriptions size='small' column={1} bordered>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                            {item.secrets.map((secret, index) => {
                                return <Descriptions.Item key={'secret' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.SecretItem" helpId="Help.Secret" values={{ key: index }} />}>{secret.name}</Descriptions.Item>
                            })}
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>>{item.age}</Descriptions.Item>
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ serviceAccountPage, masterPage, settingPage }: Store) => ({
    serviceAccounts: serviceAccountPage.serviceAccounts,
    isListLoading: serviceAccountPage.isListLoading,
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