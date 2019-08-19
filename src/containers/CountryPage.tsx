import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initCountryPage } from '../actions';
import { Store, Country } from '../reducers/State';

export interface ICountryPageProps {
    countries: Country[];
    initCountryPage: () => void;
}

class CountryPage extends React.Component<ICountryPageProps, any> {
    componentDidMount() {
        this.props.initCountryPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.countries}
                        renderItem={(item: Country) => (
                            <List.Item>
                                <Card actions={[
                                    <Icon type="help" />,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} description={item.shippingLine} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ countryPage }: Store) => ({
    countries: countryPage.countries
});

const mapDispatchToProps = {
    initCountryPage
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage);