import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Row, List, Tooltip, Popconfirm, Icon, Tag, InputNumber } from 'antd';
import { initShipyardPage } from '../actions';
import { Store, Shipyard } from '../reducers/State';


export interface IShipyardPageProps {
    shipyards: Shipyard[];
    initShipyardPage: () => void;
}

class ShipyardPage extends React.Component<IShipyardPageProps, any> {
    componentDidMount() {
        this.props.initShipyardPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.shipyards}
                        renderItem={(item: Shipyard) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <InputNumber size="small" min={1} max={10} defaultValue={item.quantity} onBlur={(value) => { console.log(value); }} />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} description={<Tooltip placement="topLeft" title={item.description}><Tag color="blue">{item.quantity}</Tag></Tooltip>} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ shipyardPage }: Store) => ({
    shipyards: shipyardPage.shipyards
});

const mapDispatchToProps = {
    initShipyardPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipyardPage);