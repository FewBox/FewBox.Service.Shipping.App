import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initNodePage } from '../actions';
import { Store, Node } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';

export interface INodePageProps {
    nodes: Node[];
    isHelp: boolean;
    initNodePage: () => void;
}

class NodePage extends React.Component<INodePageProps, any> {
    componentDidMount() {
        this.props.initNodePage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.nodes}
                        renderItem={(item: Node) => (
                            <List.Item>
                                <Card actions={[
                                    <Icon type="help" />,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={<Collapse bordered={false}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered layout="vertical">
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.IP" helpId="Help.IP"  />}>{item.ip}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Host" helpId="Help.Host" />}>{item.hostname}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered layout="vertical">
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.PodCIDR" helpId="Help.CIDR" />}>{item.podCIDR}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.CPU" helpId="Help.CPU" />}>{item.allocatableCPU}/{item.cpu}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.EphemeralStorage" helpId="Help.HardDisk" />}>{item.allocatableHD}/{item.hd}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Memory" helpId="Help.Memory" />}>{item.allocatableMemory}/{item.memory}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Pods" helpId="Help.Pods" />}>{item.pods}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.OS" helpId="Help.OS" />}>{item.os}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ContainerRuntimeVersion" helpId="Help.Runtime" />}>{item.containerRuntime}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.KubeletVersion" helpId="Help.Kubelet" />}>{item.kubelet}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.KubeProxyVersion" helpId="Help.KubeProxy" />}>{item.kubeProxy}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Images" helpId="Help.Image" />} key='3'>
                                            {item.images.map((cargo, index) => {
                                                return <div key={'cargo' + index}>
                                                    {cargo.names.map((name, index) => {
                                                        return <p key={'name' + index}>{name}</p>
                                                    })}
                                                    {cargo.size}
                                                </div>
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

const mapStateToProps = ({ nodePage, settingPage }: Store) => ({
    nodes: nodePage.nodes,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNodePage
};

export default connect(mapStateToProps, mapDispatchToProps)(NodePage);