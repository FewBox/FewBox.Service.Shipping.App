import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initCustomsPage, initShippingLineDropdownList, addCustomsBerthComponent, removeCustomsBerthComponent } from '../actions';
import { Customs, Store, ShippingLine, BerthComponent } from '../reducers/State';
import CustomsConstruction from '../components/CustomsConstruction';


export interface ICustomsPageProps {
    berthComponents: BerthComponent[];
    shippingLines: ShippingLine[];
    customs: Customs[];
    initCustomsPage: () => void;
    initShippingLineDropdownList: () => void;
    addCustomsBerthComponent: () => void;
    removeCustomsBerthComponent: (number) => void;
}

class CustomsPage extends React.Component<ICustomsPageProps, any> {
    componentDidMount() {
        this.props.initCustomsPage();
        this.props.initShippingLineDropdownList();
    }
    render() {
        return (
            <div>
                <Row>
                    <CustomsConstruction shippingLines={this.props.shippingLines} berthComponents={this.props.berthComponents} specs={[{ name: "http", value: "HTTP" }, { name: "https", value: "HTTPS" }, { name: "grpc", value: "GRPC" }, { name: "http2", value: "HTTP2" }, { name: "mongo", value: "MONGO" }, { name: "tcp", value: "TCP" }, { name: "tls", value: "TLS" }]}
                        reload={this.props.initCustomsPage} addBerthComponent={this.props.addCustomsBerthComponent} removeBerthComponent={this.props.removeCustomsBerthComponent} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.customs}
                        renderItem={(item: Customs) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
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

const mapStateToProps = ({ customsPage, masterPage }: Store) => ({
    customs: customsPage.customs,
    shippingLines: masterPage.shippingLines,
    berthComponents: customsPage.berthComponents,
});

const mapDispatchToProps = {
    initCustomsPage,
    initShippingLineDropdownList,
    addCustomsBerthComponent,
    removeCustomsBerthComponent
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomsPage);