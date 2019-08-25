import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Row, List, Tooltip, Popconfirm, Icon, Tag, InputNumber, Descriptions } from 'antd';
import { initShipyardPage, constructContainerShip, scaleContainerShipQuantity, scrapContainerShip, initShippingLineDropdownList } from '../actions';
import { Store, Shipyard, ShippingLine } from '../reducers/State';
import ShipyardConstruction from '../components/ShipyardConstruction';

export interface IShipyardPageProps {
    shipyards: Shipyard[];
    shippingLines: ShippingLine[];
    initShipyardPage: () => void;
    initShippingLineDropdownList: () => void;
    scaleContainerShipQuantity: (any) => void;
    constructContainerShip: (any) => void;
    scrapContainerShip: (any) => void;
}

class ShipyardPage extends React.Component<IShipyardPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initShipyardPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <ShipyardConstruction construct={this.props.constructContainerShip} reload={this.props.initShipyardPage} shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.shipyards}
                        renderItem={(item: Shipyard) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.scrapContainerShip({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <InputNumber size="small" min={1} max={10} defaultValue={item.quantity} onBlur={(value) => { this.props.scaleContainerShipQuantity({ shippingLine: item.shippingLine, name: item.name, quantity: value.target.value }); }} />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} />
                                    <Descriptions size='small' column={1} bordered>
                                        <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                        <Descriptions.Item label={<FormattedMessage id="Label.Quantity" />}>{item.quantity}</Descriptions.Item>
                                        <Descriptions.Item label={<FormattedMessage id="Label.Captain" />}>{item.captain}</Descriptions.Item>
                                        {item.cargos.map((cargo, index) => {
                                            return <Descriptions.Item key={'cargo' + index} label={<FormattedMessage id="Label.CargoItem" values={{ index: index + 1 }} />}>{cargo}</Descriptions.Item>
                                        })}
                                        <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ shipyardPage, masterPage }: Store) => ({
    shipyards: shipyardPage.shipyards,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initShippingLineDropdownList,
    initShipyardPage,
    constructContainerShip,
    scaleContainerShipQuantity,
    scrapContainerShip
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipyardPage);