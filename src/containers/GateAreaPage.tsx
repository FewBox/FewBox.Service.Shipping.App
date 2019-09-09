import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initGateAreaPage, initShippingLineDropdownList, constructGateArea, demolishGateArea } from '../actions';
import { GateArea, Store, ShippingLine } from '../reducers/State';
import GateAreaConstruction from '../components/GateAreaConstruction';
import { Specification } from '../jsons';


export interface IGateAreaPageProps {
    shippingLines: ShippingLine[];
    gateAreas: GateArea[];
    initGateAreaPage: () => void;
    initShippingLineDropdownList: () => void;
    constructGateArea: (any) => void;
    demolishGateArea: (any) => void;
}

class GateAreaPage extends React.Component<IGateAreaPageProps, any> {
    componentDidMount() {
        this.props.initGateAreaPage();
        this.props.initShippingLineDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <GateAreaConstruction shippingLines={this.props.shippingLines} specs={Specification}
                        reload={this.props.initGateAreaPage} construct={this.props.constructGateArea} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.gateAreas}
                        renderItem={(item: GateArea) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishGateArea({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} description={<Tooltip placement="topLeft" title={item.shippingLine}></Tooltip>} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ gateAreaPage, masterPage }: Store) => ({
    gateAreas: gateAreaPage.gateAreas,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initGateAreaPage,
    initShippingLineDropdownList,
    constructGateArea,
    demolishGateArea
};

export default connect(mapStateToProps, mapDispatchToProps)(GateAreaPage);