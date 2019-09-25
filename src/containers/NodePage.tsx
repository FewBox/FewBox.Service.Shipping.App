import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initCountryPage } from '../actions';
import { Store, Country } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface INodePageProps {
    countries: Country[];
    isHelp: boolean;
    initCountryPage: () => void;
}

class NodePage extends React.Component<INodePageProps, any> {
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
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.IP" helpId="Help.IP"  />}>{item.position}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Host" helpId="Help.Host" />}>{item.alias}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered layout="vertical">
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.PodCIDR" helpId="Help.CIDR" />}>{item.containerShipPositionZone}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.CPU" helpId="Help.CPU" />}>{item.allocatableHorsepower}/{item.horsepower}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.EphemeralStorage" helpId="Help.HardDisk" />}>{item.allocatableDisplacement}/{item.displacement}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Memory" helpId="Help.Memory" />}>{item.allocatableCube}/{item.cube}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Pods" helpId="Help.Pods" />}>{item.tonnage}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.OS" helpId="Help.OS" />}>{item.government}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ContainerRuntimeVersion" helpId="Help.Runtime" />}>{item.constitution}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.KubeletVersion" helpId="Help.Kubelet" />}>{item.industry}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.KubeProxyVersion" helpId="Help.KubeProxy" />}>{item.transportation}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Images" helpId="Help.Image" />} key='3'>
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

export default connect(mapStateToProps, mapDispatchToProps)(NodePage);