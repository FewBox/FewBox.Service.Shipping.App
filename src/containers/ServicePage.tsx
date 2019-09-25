import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initQuayAreaPage, demolishQuayArea, constructQuayArea, initNamespaceDropdownList } from '../actions';
import { QuayArea, Store, Namespace } from '../reducers/State';
import QuayAreaConstruction from '../components/ServiceCreation';
import { Protocols } from '../jsons';
import HelpFormattedMessage from '../components/HelpFormattedMessage';


export interface IServicePageProps {
    namespaces: Namespace[];
    initNamespaceDropdownList: () => void;
    quayAreas: QuayArea[];
    initQuayAreaPage: () => void;
    constructQuayArea: (any) => void;
    demolishQuayArea: (any) => void;
    isHelp: boolean;
}

class ServicePage extends React.Component<IServicePageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initQuayAreaPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <QuayAreaConstruction isHelp={this.props.isHelp} construct={this.props.constructQuayArea} reload={this.props.initQuayAreaPage}
                        protocols={Protocols} namespaces={this.props.namespaces} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.quayAreas}
                        renderItem={(item: QuayArea) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishQuayArea({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Selector" helpId="Help.PodSelector" />}>{item.containerShipSpec}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.IP" helpId="Help.ClusterIP" />}>{item.position}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Type" helpId="Help.Type" />}>{item.type}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.SessionAffinity" helpId="Help.SessionAffinity" />}>{item.containerShipAgreementType}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered>
                                                {item.berthes.map((berth, index) => {
                                                    return <Descriptions.Item key={'berth' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.ServicePortItem" helpId="Help.Port" values={{ key: berth.name }} />}>{berth.crane}=>{berth.cellGuide}</Descriptions.Item>
                                                })}
                                            </Descriptions>
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

const mapStateToProps = ({ quayAreaPage, masterPage, settingPage }: Store) => ({
    quayAreas: quayAreaPage.quayAreas,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initQuayAreaPage,
    constructQuayArea,
    demolishQuayArea,
    initNamespaceDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicePage);