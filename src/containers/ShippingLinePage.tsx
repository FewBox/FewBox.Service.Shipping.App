import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Badge } from 'antd';
import { initShippingLinePage, closeShippingLine, enableIstio, disableIstio, startShippingLine } from '../actions';
import { ShippingLine, Store } from '../reducers/State';
import ShippingLineFounder from '../components/ShippingLineFounder';
import { IstioIcon } from '../components/Icon';
import Search from 'antd/lib/input/Search';


export interface IShippingLinePageProps {
    shippingLines: ShippingLine[];
    initShippingLinePage: () => void;
    startShippingLine: (name: string) => void;
    closeShippingLine: (name: string) => void;
    enableIstio: (name: string) => void;
    disableIstio: (name: string) => void;
    intl: any;
}

class ShippingLinePage extends React.Component<IShippingLinePageProps, any> {
    componentDidMount() {
        this.props.initShippingLinePage();
    }
    render() {
        return (
            <div>
                {
                //<Row>
                    //<Search placeholder={this.props.intl.formatMessage({ id: 'Label.Search' })} onSearch={value => console.log(value)} />
                //</Row>
                }
                <Row gutter={16}>
                    <ShippingLineFounder start={this.props.startShippingLine} reload={this.props.initShippingLinePage} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.shippingLines}
                        renderItem={(item: ShippingLine) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.closeShippingLine(item.name); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Switch checkedChildren={<IstioIcon />} unCheckedChildren={<IstioIcon />} onChange={(checked) => { if (checked) { this.props.enableIstio(item.name); } else { this.props.disableIstio(item.name); } }} checked={item.isIstioInjected} />,
                                    <Icon type="ellipsis" />]}>
                                    <Descriptions title={item.name} size='small' column={1} bordered>
                                        <Descriptions.Item label={<FormattedMessage id="Label.Status" />}><Badge color={item.status === 'Active' ? 'green' : 'red'} text={item.status} /></Descriptions.Item>
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShippingLinePage));