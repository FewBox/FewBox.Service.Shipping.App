import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initShippingLinePage, closeShippingLine, enableIstio, disableIstio, startShippingLine } from '../actions';
import { ShippingLine, Store } from '../reducers/State';
import ShippingLineFounder from '../components/ShippingLineFounder';


export interface IShippingLinePageProps {
    shippingLines: ShippingLine[];
    initShippingLinePage: () => void;
    startShippingLine: (name: string) => void;
    closeShippingLine: (name: string) => void;
    enableIstio: (name: string) => void;
    disableIstio: (name: string) => void;
}

class ShippingLinePage extends React.Component<IShippingLinePageProps, any> {
    componentDidMount() {
        this.props.initShippingLinePage();
    }
    render() {
        return (
            <div>
                <Row>
                    <ShippingLineFounder start={this.props.startShippingLine} reload={this.props.initShippingLinePage} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.shippingLines}
                        renderItem={(item: ShippingLine) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.closeShippingLine(item.name); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Switch onChange={(checked) => { if (checked) { this.props.enableIstio(item.name); } else { this.props.disableIstio(item.name); } }} checked={item.isIstioInjected} />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} description={<Tooltip placement="topLeft" title={item.description}><Tag color={item.condition == 'Active' ? 'green' : 'red'}>{item.condition}</Tag></Tooltip>} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ shippingLinePage }: Store) => ({
    shippingLines: shippingLinePage.shippingLines
});

const mapDispatchToProps = {
    initShippingLinePage,
    startShippingLine,
    closeShippingLine,
    enableIstio,
    disableIstio
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingLinePage);