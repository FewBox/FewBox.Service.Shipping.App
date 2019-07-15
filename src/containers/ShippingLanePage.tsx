import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Card, Icon, Row, Col, Popconfirm, Badge, Switch } from 'antd';
import { initShippingLanePage, closeShippingLane } from '../actions';
import { ShippingLane, Store } from '../reducers/State';

export interface IAboutPageProps {
    shippingLanes: ShippingLane[];
    initShippingLanePage: any;
    closeShippingLane: any;
}

class ShippingLanePage extends React.Component<IAboutPageProps, any> {
    componentDidMount() {
        this.props.initShippingLanePage();
    }
    render() {
        let cols = [];
        let shippingLaneCount = this.props.shippingLanes.length;
        let shippingLanes = this.props.shippingLanes.map((item, index) => {
            cols.push(<Col key={"ShippingLane" + index} span={8}><Card actions={[
                <Popconfirm title={<FormattedMessage id="Confirm.DeleteShippingLane" />} onConfirm={() => { this.props.closeShippingLane(item.name); }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
                <Switch onChange={()=>{}} checked={item.isIstioInjected} />,
                <Icon type="ellipsis" />]}>
                <Card.Meta title={item.name} description={item.name} />
            </Card></Col>);
            if (index % 3 === 2 || index === shippingLaneCount - 1) {
                let value = <Row key={"ShippingLaneRow" + index} gutter={16}>{cols.map((item, index) => { return item; })}</Row>
                cols = [];
                return value;
            }
        })
        return (
            <div>
                {shippingLanes}
            </div>
        );
    }
}

const mapStateToProps = ({ shippingLane }: Store) => ({
    shippingLanes: shippingLane.shippingLanes
});

const mapDispatchToProps = {
    initShippingLanePage,
    closeShippingLane
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingLanePage);