import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initYardAreaPage, initShippingLineDropdownList, constructYardArea, demolishYardArea, initYardAreaGateAreaDropdownList, initYardAreaQuayAreaDropdownList } from '../actions';
import { YardArea, Store, ShippingLine, GateArea, QuayArea } from '../reducers/State';
import YardAreaConstruction from '../components/YardAreaConstruction';

export interface IYardAreaPageProps {
    shippingLines: ShippingLine[];
    yardAreas: YardArea[];
    gateAreas: GateArea[];
    quayAreas: QuayArea[];
    initYardAreaPage: () => void;
    initShippingLineDropdownList: () => void;
    constructYardArea: (any) => void;
    demolishYardArea: (any) => void;
    initYardAreaGateAreaDropdownList: (shippingLine: string) => void;
    initYardAreaQuayAreaDropdownList: (shippingLine: string) => void;
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
                    <YardAreaConstruction shippingLines={this.props.shippingLines} gateAreas={this.props.gateAreas} quayAreas={this.props.quayAreas}
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
                                                <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered>
                                                {item.aliases.map((alias, index) => {
                                                    return <Descriptions.Item key={'alias' + index} label={<FormattedMessage id="Label.AliasItem" values={{ key: index }} />}>{alias}</Descriptions.Item>
                                                })}
                                                {item.gateAreas.map((gateArea, index) => {
                                                    return <Descriptions.Item key={'gateArea' + index} label={<FormattedMessage id="Label.GateAreaItem" values={{ key: index }} />}>{gateArea}</Descriptions.Item>
                                                })}
                                                {item.guideboards.map((guideboard, index) => {
                                                    return <Descriptions.Item key={'guideboard' + index} label={<FormattedMessage id="Label.GuideboardItem" values={{ key: index }} />}>
                                                        {guideboard.targets != null ? guideboard.targets.map((target, index) => {
                                                            return <p key={'target' + index}>{JSON.stringify(target)}</p>
                                                        }) : null}
                                                        {guideboard.directions.map((direction, index) => {
                                                            return <p key={'direction' + index}>{direction.quayArea} : {direction.crane}</p>
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

const mapStateToProps = ({ yardAreaPage, masterPage }: Store) => ({
    yardAreas: yardAreaPage.yardAreas,
    gateAreas: yardAreaPage.gateAreas,
    quayAreas: yardAreaPage.quayAreas,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initYardAreaPage,
    initShippingLineDropdownList,
    constructYardArea,
    demolishYardArea,
    initYardAreaGateAreaDropdownList,
    initYardAreaQuayAreaDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(YardAreaPage);