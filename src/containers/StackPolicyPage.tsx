import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initStackPolicyPage, initShippingLineDropdownList, draftStackPolicy, abolishStackPolicy, initStackPolicyQuayAreaDropdownList, initStackPolicyShipyardDropdownList, showDrawer } from '../actions';
import { StackPolicy, Store, ShippingLine, GateArea, QuayArea, Shipyard } from '../reducers/State';
import StackPolicyDraft from '../components/StackPolicyDraft';

export interface IStackPolicyPageProps {
    shippingLines: ShippingLine[];
    stackPolicies: StackPolicy[];
    quayAreas: QuayArea[];
    shipyards: Shipyard[];
    initStackPolicyPage: () => void;
    initShippingLineDropdownList: () => void;
    showDrawer: (drawerType: any) => void;
    draftStackPolicy: (any) => void;
    abolishStackPolicy: (any) => void;
    initStackPolicyQuayAreaDropdownList: (shippingLine: string) => void;
    initStackPolicyShipyardDropdownList: (identificationCode: string) => void;
}

class StackPolicyPage extends React.Component<IStackPolicyPageProps, any> {
    componentDidMount() {
        this.props.initStackPolicyPage();
        this.props.initShippingLineDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <StackPolicyDraft shippingLines={this.props.shippingLines} quayAreas={this.props.quayAreas} refreshQuayAreas={this.props.initStackPolicyQuayAreaDropdownList}
                        shipyards={this.props.shipyards} refreshShipyards={this.props.initStackPolicyShipyardDropdownList} reload={this.props.initStackPolicyPage} draft={this.props.draftStackPolicy} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.stackPolicies}
                        renderItem={(item: StackPolicy) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.abolishStackPolicy({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" onClick={() => this.props.showDrawer({ type: 'StackPolicy', shippingLine: item.shippingLine, name: item.name, subsets: item.subsets, shipyards: this.props.shipyards })} />]}>
                                    <Card.Meta title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered>
                                                <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered>
                                                {item.subsets.map((subset, index) => {
                                                    return <Descriptions.Item key={'subset' + index} label={<FormattedMessage id="Label.SubsetItem" values={{ key: index }} />}>{subset.name}</Descriptions.Item>
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

const mapStateToProps = ({ stackPolicyPage, masterPage }: Store) => ({
    stackPolicies: stackPolicyPage.stackPolicies,
    quayAreas: stackPolicyPage.quayAreas,
    shipyards: stackPolicyPage.shipyards,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initStackPolicyPage,
    initShippingLineDropdownList,
    draftStackPolicy,
    abolishStackPolicy,
    initStackPolicyQuayAreaDropdownList,
    initStackPolicyShipyardDropdownList,
    showDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(StackPolicyPage);