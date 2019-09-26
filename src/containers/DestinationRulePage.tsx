import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initDestinationRulePage, initNamespaceDropdownList, createDestinationRule, deleteDestinationRule, initStackPolicyServiceDropdownList, initStackPolicyShipyardDropdownList,
    showDrawer, selectStackPolicy
} from '../actions';
import { DestinationRule, Store, Namespace, Gateway, Service, Deployment } from '../reducers/State';
import StackPolicyDraft from '../components/DestinationRuleCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IDestinationRulePageProps {
    namespaces: Namespace[];
    stackPolicies: DestinationRule[];
    services: Service[];
    shipyards: Deployment[];
    initDestinationRulePage: () => void;
    initNamespaceDropdownList: () => void;
    showDrawer: (drawerType: any) => void;
    draftStackPolicy: (any) => void;
    abolishStackPolicy: (any) => void;
    initStackPolicyQuayAreaDropdownList: (namespaceName: string) => void;
    initStackPolicyShipyardDropdownList: (identificationCode: string) => void;
    selectStackPolicy: (namespaceName: string, name: string) => void;
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
                    <StackPolicyDraft isHelp={this.props.isHelp} namespaces={this.props.namespaces} quayAreas={this.props.services} refreshQuayAreas={this.props.initStackPolicyQuayAreaDropdownList}
                        shipyards={this.props.shipyards} refreshShipyards={this.props.initStackPolicyShipyardDropdownList} reload={this.props.initDestinationRulePage} draft={this.props.draftStackPolicy} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.stackPolicies}
                        renderItem={(item: DestinationRule) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.abolishStackPolicy({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" onClick={() => { this.props.selectStackPolicy(item.namespace, item.name); this.props.showDrawer({ type: 'StackPolicy', namespace: item.namespace, name: item.name, subsets: item.subsets, shipyards: this.props.shipyards }); }} />]}>
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
    quayAreas: destinationRulePage.services,
    shipyards: destinationRulePage.deployments,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initDestinationRulePage,
    initNamespaceDropdownList,
    draftStackPolicy: createDestinationRule,
    abolishStackPolicy: deleteDestinationRule,
    initStackPolicyServiceDropdownList,
    initStackPolicyShipyardDropdownList,
    showDrawer,
    selectStackPolicy
};

export default connect(mapStateToProps, mapDispatchToProps)(DestinationRulePage);