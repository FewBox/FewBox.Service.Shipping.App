import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
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
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.countries}
                        renderItem={(item: Country) => (
                            <List.Item>
                                <Card actions={[
                                    <Icon type="help" />,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered layout="vertical">
                                                <Descriptions.Item label={<FormattedMessage id="Label.Position" />}>{item.position}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Alias" />}>{item.alias}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered layout="vertical">
                                                <Descriptions.Item label={<FormattedMessage id="Label.ContainerShipPositionZone" />}>{item.containerShipPositionZone}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Horsepower" />}>{item.allocatableHorsepower}/{item.horsepower}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Displacement" />}>{item.allocatableDisplacement}/{item.displacement}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Cube" />}>{item.allocatableCube}/{item.cube}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Tonnage" />}>{item.tonnage}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Government" />}>{item.government}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Constitution" />}>{item.constitution}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Industry" />}>{item.industry}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Transportation" />}>{item.transportation}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Cargos" />} key='3'>
                                            {item.cargos.map((cargo, index) => {
                                                return <p key={'cargo' + index}>
                                                    {cargo.names.map((name, index) => {
                                                        return <div key={'name' + index}>{name}</div>
                                                    })}
                                                    {cargo.size}
                                                </p>
                                            })}
                                        </Collapse.Panel>
                                    </Collapse>} />

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