import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Popconfirm, List, Descriptions, Collapse, Popover, Button } from 'antd';
import { initNamespaceDropdownList, initSecretPage, createSecret, deleteSecret } from '../actions';
import SecretCreation from '../components/SecretCreation';
import { Store, Secret, Namespace } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface ISecretPageProps {
    namespaces: Namespace[];
    secrets: Secret[];
    initSecretPage: () => void;
    createSecret: (any) => void;
    deleteSecret: (any) => void;
    initNamespaceDropdownList: () => void;
    isHelp: boolean;
}

class SecretPage extends React.Component<ISecretPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initSecretPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <SecretCreation isHelp={this.props.isHelp} create={this.props.createSecret} reload={this.props.initSecretPage} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.secrets}
                        renderItem={(item: Secret) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteSecret({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
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
                                                    {Object.keys(item.datas).map((key, index) => {
                                                        return <Descriptions.Item key={'data' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.DataItem" helpId="Help.Data" values={{ key: key }} />}>
                                                            <Popover title={key} trigger="click" content={atob(item.datas[key])}>
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

const mapStateToProps = ({ secretPage, masterPage, settingPage }: Store) => ({
    secrets: secretPage.secrets,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initSecretPage,
    createSecret,
    deleteSecret
};

export default connect(mapStateToProps, mapDispatchToProps)(SecretPage);