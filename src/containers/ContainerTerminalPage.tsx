import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initContainerTerminalPage, demolishContainerTerminal, buildContainerTerminal, addBerthComponent, removeBerthComponent, initShippingLineDropdownList } from '../actions';
import { ContainerTerminal, Store, BerthComponent, ShippingLine } from '../reducers/State';
import ContainerTerminalConstruction from '../components/ContainerTerminalConstruction';


export interface IContainerTerminalPageProps {
    berthComponents: BerthComponent[];
    shippingLines: ShippingLine[];
    addBerthComponent: () => void;
    initShippingLineDropdownList: () => void;
    removeBerthComponent: (number) => void;
    containerTerminals: ContainerTerminal[];
    initContainerTerminalPage: () => void;
    buildContainerTerminal: (any) => void;
    demolishContainerTerminal: (any) => void;
}

class ContainerTerminalPage extends React.Component<IContainerTerminalPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initContainerTerminalPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <ContainerTerminalConstruction build={this.props.buildContainerTerminal} reload={this.props.initContainerTerminalPage} berthComponents={this.props.berthComponents}
                        addBerthComponent={this.props.addBerthComponent} removeBerthComponent={this.props.removeBerthComponent}
                        shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.containerTerminals}
                        renderItem={(item: ContainerTerminal) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishContainerTerminal({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} />
                                    <p>{item.shippingLine}</p>
                                    <p>{item.containerShipSpec}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ containerTerminalPage, masterPage }: Store) => ({
    containerTerminals: containerTerminalPage.containerTerminals,
    berthComponents: containerTerminalPage.berthComponents,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initContainerTerminalPage,
    buildContainerTerminal,
    demolishContainerTerminal,
    addBerthComponent,
    removeBerthComponent,
    initShippingLineDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerTerminalPage);