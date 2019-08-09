import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initCustomPage } from '../actions';
import { Custom, Store } from '../reducers/State';
import CustomConstruction from '../components/CustomConstruction';


export interface ICustomPageProps {
    customs: Custom[];
    initCustomPage: ()=>void;
}

class CustomPage extends React.Component<ICustomPageProps, any> {
    componentDidMount() {
        this.props.initCustomPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <CustomConstruction />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.customs}
                        renderItem={(item: Custom) => (
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

const mapStateToProps = ({ customPage }: Store) => ({
    customs: customPage.customs
});

const mapDispatchToProps = {
    initCustomPage
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomPage);