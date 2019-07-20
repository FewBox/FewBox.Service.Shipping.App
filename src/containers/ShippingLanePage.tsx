import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip } from 'antd';
import { initShippingLanePage, closeShippingLane, enableIstio, disableIstio, startShippingLane } from '../actions';
import { ShippingLane, Store } from '../reducers/State';
import ShippingLaneStartor from '../components/ShippingLaneStartor';


export interface IAboutPageProps {
    shippingLanes: ShippingLane[];
    initShippingLanePage: () => void;
    startShippingLane: (name: string) => void;
    closeShippingLane: (name: string) => void;
    enableIstio: (name: string) => void;
    disableIstio: (name: string) => void;
}

class ShippingLanePage extends React.Component<IAboutPageProps, any> {
    componentDidMount() {
        this.props.initShippingLanePage();
    }
    render() {

        return (
            <div>
                <Row>
                    <ShippingLaneStartor start={this.props.startShippingLane} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.shippingLanes}
                        renderItem={(item: ShippingLane) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.DeleteShippingLane" />} onConfirm={() => { this.props.closeShippingLane(item.name); }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Switch onChange={(checked) => { if (checked) { this.props.enableIstio(item.name); } else { this.props.disableIstio(item.name); } }} checked={item.isIstioInjected} />,
                                    <Icon type="ellipsis" />]}>
                                    <Tooltip placement="topLeft" title={item.labels}>
                                        <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} description={item.labels} />
                                    </Tooltip>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ shippingLane }: Store) => ({
    shippingLanes: shippingLane.shippingLanes
});

const mapDispatchToProps = {
    initShippingLanePage,
    startShippingLane,
    closeShippingLane,
    enableIstio,
    disableIstio
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingLanePage);