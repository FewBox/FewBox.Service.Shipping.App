import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initFreeTradeAreaPage, initNamespaceDropdownList, constructFreeTradeArea, demolishFreeTradeArea } from '../actions';
import { FreeTradeArea, Store, Namespace } from '../reducers/State';
import FreeTradeAreaConstruction from '../components/ServiceEntryCreation';
import { Protocols, Locations, Resolutions } from '../jsons';
import HelpFormattedMessage from '../components/HelpFormattedMessage';


export interface IServiceEntryPageProps {
    namespaces: Namespace[];
    freeTradeAreas: FreeTradeArea[];
    initFreeTradeAreaPage: () => void;
    initNamespaceDropdownList: () => void;
    constructFreeTradeArea: (any) => void;
    demolishFreeTradeArea: (any) => void;
    isHelp: boolean;
}

class ServiceEntryPage extends React.Component<IServiceEntryPageProps, any> {
    componentDidMount() {
        this.props.initFreeTradeAreaPage();
        this.props.initNamespaceDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <FreeTradeAreaConstruction isHelp={this.props.isHelp} namespaces={this.props.namespaces} protocols={Protocols} locations={Locations} resolutions={Resolutions}
                        reload={this.props.initFreeTradeAreaPage} construct={this.props.constructFreeTradeArea} />
                </Row>
                <Row gutter={16}>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.freeTradeAreas}
                        renderItem={(item: FreeTradeArea) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishFreeTradeArea({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.Namespace" />}>{item.namespace}</Descriptions.Item>
                                                <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered>
                                                {item.aliases ? item.aliases.map((alias, index) => {
                                                    return <Descriptions.Item key={'alias' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.HostItem" helpId="Help.Host" values={{ key: index }} />}>{alias}</Descriptions.Item>
                                                }) : null}
                                                {item.positions ? item.positions.map((position, index) => {
                                                    return <Descriptions.Item key={'position' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.IPItem" helpId="Help.Address" values={{ key: index }} />}>{position}</Descriptions.Item>
                                                }) : null}
                                                {item.passes ? item.passes.map((pass, index) => {
                                                    return <Descriptions.Item key={'pass' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.PortItem" helpId="Help.Port" values={{ key: pass.name }} />}>{pass.protocol}:{pass.number}</Descriptions.Item>
                                                }) : null}
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

const mapStateToProps = ({ freeTradeAreaPage, masterPage, settingPage }: Store) => ({
    freeTradeAreas: freeTradeAreaPage.freeTradeAreas,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initFreeTradeAreaPage,
    initNamespaceDropdownList,
    constructFreeTradeArea,
    demolishFreeTradeArea
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEntryPage);