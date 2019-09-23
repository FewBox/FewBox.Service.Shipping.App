import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initYardAreaPage, initShippingLineDropdownList, constructYardArea, demolishYardArea, initYardAreaGateAreaDropdownList, initYardAreaQuayAreaDropdownList, initYardAreaShipyardDropdownList } from '../actions';
import { YardArea, Store, ShippingLine, GateArea, QuayArea, Shipyard } from '../reducers/State';
import YardAreaConstruction from '../components/YardAreaConstruction';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface IYardAreaPageProps {
    shippingLines: ShippingLine[];
    yardAreas: YardArea[];
    gateAreas: GateArea[];
    quayAreas: QuayArea[];
    shipyards: Shipyard[];
    initYardAreaPage: () => void;
    initShippingLineDropdownList: () => void;
    constructYardArea: (any) => void;
    demolishYardArea: (any) => void;
    initYardAreaGateAreaDropdownList: (shippingLine: string) => void;
    initYardAreaQuayAreaDropdownList: (shippingLine: string) => void;
    initYardAreaShipyardDropdownList: (identificationCode: string) => void;
    isHelp: boolean;
}

class YardAreaPage extends React.Component<IYardAreaPageProps, any> {
    componentDidMount() {
        this.props.initYardAreaPage();
        this.props.initShippingLineDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <YardAreaConstruction isHelp={this.props.isHelp} shippingLines={this.props.shippingLines} gateAreas={this.props.gateAreas} quayAreas={this.props.quayAreas}
                        shipyards={this.props.shipyards} refreshShipyards={this.props.initYardAreaShipyardDropdownList}
                        refreshGateAreas={this.props.initYardAreaGateAreaDropdownList} refreshQuayAreas={this.props.initYardAreaQuayAreaDropdownList} reload={this.props.initYardAreaPage} construct={this.props.constructYardArea} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.yardAreas}
                        renderItem={(item: YardArea) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishYardArea({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered>
                                                {item.aliases.map((alias, index) => {
                                                    return <Descriptions.Item key={'alias' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Host' id="Label.AliasItem" values={{ key: index }} />}>{alias}</Descriptions.Item>
                                                })}
                                                {item.gateAreas.map((gateArea, index) => {
                                                    return <Descriptions.Item key={'gateArea' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Gateway' id="Label.GateAreaItem" values={{ key: index }} />}>{gateArea}</Descriptions.Item>
                                                })}
                                                {item.guideboards.map((guideboard, index) => {
                                                    return <Descriptions.Item key={'guideboard' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Match' id="Label.GuideboardItem" values={{ key: index }} />}>
                                                        {guideboard.targets != null ? guideboard.targets.map((target, index) => {
                                                            return <p key={'target' + index}>{JSON.stringify(target)}</p>
                                                        }) : null}
                                                        {guideboard.directions.map((direction, index) => {
                                                            return <p key={'direction' + index}>{direction.quayArea} : {direction.crane ? direction.crane : direction.numbering}</p>
                                                        })}
                                                    </Descriptions.Item>
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

const mapStateToProps = ({ yardAreaPage, masterPage, settingPage }: Store) => ({
    yardAreas: yardAreaPage.yardAreas,
    gateAreas: yardAreaPage.gateAreas,
    quayAreas: yardAreaPage.quayAreas,
    shipyards: yardAreaPage.shipyards,
    shippingLines: masterPage.shippingLines,
    isHelp: settingPage
});

const mapDispatchToProps = {
    initYardAreaPage,
    initShippingLineDropdownList,
    constructYardArea,
    demolishYardArea,
    initYardAreaGateAreaDropdownList,
    initYardAreaQuayAreaDropdownList,
    initYardAreaShipyardDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(YardAreaPage);