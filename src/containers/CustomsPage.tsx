import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initCustomsPage, initShippingLineDropdownList } from '../actions';
import { Customs, Store, ShippingLine } from '../reducers/State';
import CustomsConstruction from '../components/CustomsConstruction';


export interface ICustomsPageProps {
    shippingLines: ShippingLine[];
    customs: Customs[];
    initCustomsPage: ()=>void;
    initShippingLineDropdownList: () => void;
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
                    <CustomsConstruction shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.customs}
                        renderItem={(item: Customs) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
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
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initCustomsPage,
    initShippingLineDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomsPage);