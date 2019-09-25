import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse, Popover, Button } from 'antd';
import { initNamespaceDropdownList, initCredentialPage, issueCredential, revokeCredential } from '../actions';
import CredentialIssued from '../components/SecretCreation';
import { Store, Credential, Namespace } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface ISecretPageProps {
    namespaces: Namespace[];
    credentials: Credential[];
    initCredentialPage: () => void;
    issueCredential: (any) => void;
    revokeCredential: (any) => void;
    initNamespaceDropdownList: () => void;
    isHelp: boolean;
}

class SecretPage extends React.Component<ISecretPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initCredentialPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <CredentialIssued isHelp={this.props.isHelp} issue={this.props.issueCredential} reload={this.props.initCredentialPage} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.credentials}
                        renderItem={(item: Credential) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.revokeCredential({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                                <Descriptions size='small' column={1} bordered>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Type" helpId="Help.Type" />}>{item.type}</Descriptions.Item>
                                                    <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                                                </Descriptions>
                                            </Collapse.Panel>
                                            <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                                <Descriptions size='small' column={1} bordered>
                                                    {Object.keys(item.stamps).map((key, index) => {
                                                        return <Descriptions.Item key={'stamp' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.DataItem" helpId="Help.Data" values={{key: key}} />}>
                                                            <Popover title={key} trigger="click" content={atob(item.stamps[key])}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                </Descriptions>
                                            </Collapse.Panel>
                                        </Collapse>
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

const mapStateToProps = ({ credentialPage, masterPage, settingPage }: Store) => ({
    credentials: credentialPage.credentials,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initCredentialPage,
    issueCredential,
    revokeCredential
};

export default connect(mapStateToProps, mapDispatchToProps)(SecretPage);