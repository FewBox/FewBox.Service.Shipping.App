import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initFleetPage, dissolveFleet, setupFleet, addOwnershipItemComponent, removeOwnershipItemComponent, initShippingLineDropdownList } from '../actions';
import { Fleet, Store, OwnerShipItemComponent, ShippingLine } from '../reducers/State';
import FleetSetup from '../components/FleetSetup';


export interface IFleetPageProps {
    ownerShipItemComponents: OwnerShipItemComponent[];
    shippingLines: ShippingLine[];
    addOwnershipItemComponent: () => void;
    initShippingLineDropdownList: () => void;
    removeOwnershipItemComponent: (number)=>void;
    fleets: Fleet[];
    initFleetPage: () => void;
    setupFleet: (any) => void;
    dissolveFleet: (any) => void;
}

class FleetPage extends React.Component<IFleetPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initFleetPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <FleetSetup setup={this.props.setupFleet} reload={this.props.initFleetPage} ownerShipItemComponents={this.props.ownerShipItemComponents}
                    addOwnershipItemComponent={this.props.addOwnershipItemComponent} removeOwnershipItemComponent={this.props.removeOwnershipItemComponent}
                    shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.fleets}
                        renderItem={(item: Fleet) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.dissolveFleet(item.name); }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
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

const mapStateToProps = ({ fleetPage, masterPage }: Store) => ({
    fleets: fleetPage.fleets,
    ownerShipItemComponents: fleetPage.ownerShipItemComponents,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initFleetPage,
    setupFleet,
    dissolveFleet,
    addOwnershipItemComponent,
    removeOwnershipItemComponent,
    initShippingLineDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(FleetPage);