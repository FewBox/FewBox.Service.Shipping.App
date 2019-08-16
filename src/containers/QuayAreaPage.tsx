import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initQuayAreaPage, demolishQuayArea, constructQuayArea, addBerthComponent, removeBerthComponent, initShippingLineDropdownList } from '../actions';
import { QuayArea, Store, BerthComponent, ShippingLine } from '../reducers/State';
import QuayAreaConstruction from '../components/QuayAreaConstruction';


export interface IQuayAreaPageProps {
    berthComponents: BerthComponent[];
    shippingLines: ShippingLine[];
    addBerthComponent: () => void;
    initShippingLineDropdownList: () => void;
    removeBerthComponent: (number) => void;
    quayAreas: QuayArea[];
    initQuayAreaPage: () => void;
    constructQuayArea: (any) => void;
    demolishQuayArea: (any) => void;
}

class QuayAreaPage extends React.Component<IQuayAreaPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initQuayAreaPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <QuayAreaConstruction construct={this.props.constructQuayArea} reload={this.props.initQuayAreaPage} berthComponents={this.props.berthComponents}
                        addBerthComponent={this.props.addBerthComponent} removeBerthComponent={this.props.removeBerthComponent}
                        shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.quayAreas}
                        renderItem={(item: QuayArea) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishQuayArea({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} />
                                    <p>{item.shippingLine}</p>
                                    <p>{item.containerShipSpec}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ quayAreaPage, masterPage }: Store) => ({
    quayAreas: quayAreaPage.quayAreas,
    berthComponents: quayAreaPage.berthComponents,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initQuayAreaPage,
    constructQuayArea,
    demolishQuayArea,
    addBerthComponent,
    removeBerthComponent,
    initShippingLineDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(QuayAreaPage);