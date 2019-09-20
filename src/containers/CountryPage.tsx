import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initCountryPage } from '../actions';
import { Store, Country } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface ICountryPageProps {
    countries: Country[];
    isHelp: boolean;
    initCountryPage: () => void;
}

class CountryPage extends React.Component<ICountryPageProps, any> {
    componentDidMount() {
        this.props.initCountryPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
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
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Position" helpId="Help.IP"  />}>{item.position}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Alias" helpId="Help.Host" />}>{item.alias}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered layout="vertical">
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ContainerShipPositionZone" helpId="Help.CIDR" />}>{item.containerShipPositionZone}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Horsepower" helpId="Help.CPU" />}>{item.allocatableHorsepower}/{item.horsepower}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Displacement" helpId="Help.HardDisk" />}>{item.allocatableDisplacement}/{item.displacement}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Cube" helpId="Help.Memory" />}>{item.allocatableCube}/{item.cube}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Tonnage" helpId="Help.Pods" />}>{item.tonnage}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Government" helpId="Help.OS" />}>{item.government}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Constitution" helpId="Help.Runtime" />}>{item.constitution}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Industry" helpId="Help.Kubelet" />}>{item.industry}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Transportation" helpId="Help.KubeProxy" />}>{item.transportation}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Cargos" helpId="Help.Image" />} key='3'>
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

const mapStateToProps = ({ countryPage, settingPage }: Store) => ({
    countries: countryPage.countries,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initCountryPage
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage);