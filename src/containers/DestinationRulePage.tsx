import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions, Dropdown, Menu, Button } from 'antd';
import {
    initDestinationRulePage, initNamespaceDropdownList, createDestinationRule, deleteDestinationRule, initDestinationRuleServiceDropdownList, initDestinationRuleDeploymentDropdownList,
    showDrawer, selectDestinationRule
} from '../actions';
import { DestinationRule, Store, Namespace, Gateway, Service, Deployment } from '../reducers/State';
import DestinationRuleCreation from '../components/DestinationRuleCreation';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import { TLSModeOptions } from '../jsons';
import ResourcesCard from '../components/ResourcesCard';
import ShowModule from '../util/ShowModule';

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
    initDestinationRuleDeploymentDropdownList: (app: string) => void;
    selectDestinationRule: (namespaceName: string, name: string) => void;
    isHelp: boolean;
    isListLoading: boolean;
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
                    {ShowModule('M_Shipping_MODULEDESTINATIONRULE_CUD') && <DestinationRuleCreation isHelp={this.props.isHelp} tlsModeOptions={TLSModeOptions} namespaces={this.props.namespaces} services={this.props.services} refreshServices={this.props.initDestinationRuleServiceDropdownList}
                        deployments={this.props.deployments} refreshDeployments={this.props.initDestinationRuleDeploymentDropdownList} reload={this.props.initDestinationRulePage} create={this.props.createDestinationRule} />}
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.destinationRules}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteDestinationRule({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}>{ShowModule('M_Shipping_MODULEDESTINATIONRULE_CUD') && <Icon type="delete" />}</Popconfirm>,
                            <Icon type="help" />,
                            <Dropdown overlay={<Menu>
                                {ShowModule('M_Shipping_MODULEDESTINATIONRULE_CUD') && <Menu.Item>
                                    <Button type="link" icon="setting" onClick={() => { this.props.selectDestinationRule(item.namespace, item.name); this.props.showDrawer({ type: 'DestinationRule', namespace: item.namespace, name: item.name, subsets: item.subsets, deployments: this.props.deployments }); }}></Button>
                                </Menu.Item>}
                            </Menu>}>
                                <a className="ant-dropdown-link">
                                    <Icon type="ellipsis" />
                                </a>
                            </Dropdown>]}
                        renderBasic={(item) => <Descriptions size='small' column={1}>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.Namespace" />}>{item.namespace}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                        renderMore={(item) => <Descriptions size='small' column={1} bordered>
                            {item.subsets.map((subset, index) => {
                                return <Descriptions.Item key={'subset' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Version' id="Label.SubsetItem" values={{ key: index }} />}>{subset.name}</Descriptions.Item>
                            })}
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ destinationRulePage, masterPage, settingPage }: Store) => ({
    destinationRules: destinationRulePage.items,
    isListLoading: destinationRulePage.isListLoading,
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