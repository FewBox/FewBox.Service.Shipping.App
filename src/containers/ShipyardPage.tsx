import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Row, List, Tooltip, Popconfirm, Icon, Tag, InputNumber, Descriptions, Popover, Button, Collapse, Badge } from 'antd';
import { initShipyardPage, constructContainerShip, scaleContainerShipQuantity, scrapContainerShip, initShippingLineDropdownList, showDrawer } from '../actions';
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
    showDrawer: (drawerType: any) => void;
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
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.shipyards}
                        renderItem={(item: Shipyard) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.scrapContainerShip({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <InputNumber size="small" min={1} max={10} defaultValue={item.quantity} onBlur={(value) => { this.props.scaleContainerShipQuantity({ shippingLine: item.shippingLine, name: item.name, quantity: value.target.value }); }} />,
                                    <Icon type="ellipsis" onClick={() => this.props.showDrawer({ type: 'Shipyard', shippingLine: item.shippingLine, name: item.name, cargos: item.cargos })} />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={
                                        <Collapse bordered={false} defaultActiveKey={['1']}>
                                            <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                                <Descriptions size='small' column={1} bordered>
                                                    <Descriptions.Item label={<FormattedMessage id="Label.Numbering" />}>{item.numbering}</Descriptions.Item>
                                                    <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                                    <Descriptions.Item label={<FormattedMessage id="Label.Quantity" />}>{item.quantity}</Descriptions.Item>
                                                    <Descriptions.Item label={<FormattedMessage id="Label.Captain" />}>{item.captain}</Descriptions.Item>
                                                    <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                                </Descriptions>
                                            </Collapse.Panel>
                                            <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                                <Descriptions size='small' column={1} bordered>
                                                    {item.cargos.map((cargo, index) => {
                                                        return <Descriptions.Item key={'cargo' + index} label={<FormattedMessage id="Label.CargoItem" values={{ key: index + 1 }} />}>
                                                            <Popover title={<FormattedMessage id="Label.CargoItem" values={{ key: index + 1 }} />} trigger="click" content={cargo}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                    {item.documents.map((document, index) => {
                                                        return <Descriptions.Item key={'document' + index} label={<FormattedMessage id="Label.DocumentItem" values={{ key: document.name }} />}>
                                                            <Popover title={document.name} trigger="click" content={JSON.stringify(document)}>
                                                                <Button type="primary" icon='eye'></Button>
                                                            </Popover>
                                                        </Descriptions.Item>
                                                    })}
                                                    {item.documentDefinitions.map((documentDefinition, index) => {
                                                        return <Descriptions.Item key={'documentDefinition' + index} label={<Badge color={documentDefinition.isWaterMarked ? 'red' : 'green'} text={<FormattedMessage id="Label.DocumentDefinition" values={{ key: documentDefinition.name }} />} />}>
                                                            <p>{documentDefinition.term}</p>
                                                            <p>{documentDefinition.subTerm}</p>
                                                        </Descriptions.Item>
                                                    })}
                                                </Descriptions>
                                            </Collapse.Panel>
                                        </Collapse>
                                    } />
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
    scrapContainerShip,
    showDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipyardPage);