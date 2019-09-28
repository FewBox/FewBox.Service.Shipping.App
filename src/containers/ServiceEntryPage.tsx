import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Collapse, Descriptions } from 'antd';
import { initServiceEntryPage, initNamespaceDropdownList, createServiceEntry, deleteServiceEntry } from '../actions';
import { ServiceEntry, Store, Namespace } from '../reducers/State';
import ServiceEntryCreation from '../components/ServiceEntryCreation';
import { ProtocolOptions, LocationOptions, ResolutionOptions } from '../jsons';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import ResourcesCard from '../components/ResourcesCard';


export interface IServiceEntryPageProps {
    namespaces: Namespace[];
    serviceEntries: ServiceEntry[];
    initServiceEntryPage: () => void;
    initNamespaceDropdownList: () => void;
    createServiceEntry: (any) => void;
    deleteServiceEntry: (any) => void;
    isHelp: boolean;
}

class ServiceEntryPage extends React.Component<IServiceEntryPageProps, any> {
    componentDidMount() {
        this.props.initServiceEntryPage();
        this.props.initNamespaceDropdownList();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <ServiceEntryCreation isHelp={this.props.isHelp} namespaces={this.props.namespaces} protocolOptions={ProtocolOptions} locationOptions={LocationOptions} resolutionOptions={ResolutionOptions}
                        reload={this.props.initServiceEntryPage} create={this.props.createServiceEntry} />
                </Row>
                <Row gutter={16}>
                    <ResourcesCard resources={this.props.serviceEntries}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteServiceEntry({ namespace: item.namespace, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                            <Icon type="help" />,
                            <Icon type="ellipsis" />]}
                        renderBasic={(item) => <Descriptions size='small' column={1} bordered>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Namespace' id="Label.Namespace" />}>{item.namespace}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} helpId='Help.Age' id="Label.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                        renderMore={(item) => <Descriptions size='small' column={1} bordered>
                            {item.hosts ? item.hosts.map((host, index) => {
                                return <Descriptions.Item key={'host' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.HostItem" helpId="Help.Host" values={{ key: index }} />}>{host}</Descriptions.Item>
                            }) : null}
                            {item.addresses ? item.addresses.map((address, index) => {
                                return <Descriptions.Item key={'address' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.IPItem" helpId="Help.Address" values={{ key: index }} />}>{address}</Descriptions.Item>
                            }) : null}
                            {item.ports ? item.ports.map((port, index) => {
                                return <Descriptions.Item key={'port' + index} label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.PortItem" helpId="Help.Port" values={{ key: port.name }} />}>{port.protocol}:{port.number}</Descriptions.Item>
                            }) : null}
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ serviceEntryPage, masterPage, settingPage }: Store) => ({
    serviceEntries: serviceEntryPage.serviceEntries,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initServiceEntryPage,
    initNamespaceDropdownList,
    createServiceEntry,
    deleteServiceEntry
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceEntryPage);