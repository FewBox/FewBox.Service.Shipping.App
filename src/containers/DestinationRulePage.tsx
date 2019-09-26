import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import {
    initDestinationRulePage, initNamespaceDropdownList, createDestinationRule, deleteDestinationRule, initDestinationRuleServiceDropdownList, initDestinationRuleDeploymentDropdownList,
    showDrawer, selectDestinationRule
} from '../actions';
import { DestinationRule, Store, Namespace, Gateway, Service, Deployment } from '../reducers/State';
import DestinationRuleCreation from '../components/DestinationRuleCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IDestinationRulePageProps {
    namespaces: Namespace[];
    destinationRules: DestinationRule[];
    services: Service[];
    deployments: Deployment[];
    initDestinationRulePage: () => void;
    initNamespaceDropdownList: () => void;
    showDrawer: (drawerType: any) => void;
    createDestinationRule: (any) => void;
    deleteDestinationRule: (any) => void;
    initDestinationRuleServiceDropdownList: (namespaceName: string) => void;
    initDestinationRuleDeploymentDropdownList: (identificationCode: string) => void;
    selectDestinationRule: (namespaceName: string, name: string) => void;
    isHelp: boolean;
}

class DestinationRulePage extends React.Component<IDestinationRulePageProps, any> {
    componentDidMount() {
        this.props.initDestinationRulePage();
        this.props.initNamespaceDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <DestinationRuleCreation isHelp={this.props.isHelp} namespaces={this.props.namespaces} services={this.props.services} refreshVirtualServices={this.props.initDestinationRuleServiceDropdownList}
                        deployments={this.props.deployments} refreshDeployments={this.props.initDestinationRuleDeploymentDropdownList} reload={this.props.initDestinationRulePage} create={this.props.createDestinationRule} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.destinationRules}
                        renderItem={(item: DestinationRule) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteDestinationRule({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" onClick={() => { this.props.selectDestinationRule(item.namespace, item.name); this.props.showDrawer({ type: 'DestinationRule', namespace: item.namespace, name: item.name, subsets: item.subsets, deployments: this.props.deployments }); }} />]}>
                                    <Card.Meta title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered>
                                                {item.subsets.map((subset, index) => {
                                                    return <Descriptions.Item key={'subset' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Version' id="Label.SubsetItem" values={{ key: index }} />}>{subset.name}</Descriptions.Item>
                                                })}
                                            </Descriptions>
                                        </Collapse.Panel>
                                    </Collapse>} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ destinationRulePage, masterPage, settingPage }: Store) => ({
    stackPolicies: destinationRulePage.destinationRules,
    services: destinationRulePage.services,
    deployments: destinationRulePage.deployments,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initDestinationRulePage,
    initNamespaceDropdownList,
    createDestinationRule,
    deleteDestinationRule,
    initDestinationRuleServiceDropdownList,
    initDestinationRuleDeploymentDropdownList,
    showDrawer,
    selectDestinationRule
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationRulePage);