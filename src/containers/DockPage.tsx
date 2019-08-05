import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag } from 'antd';
import { initDockPage, demolishDock, buildDock, addMooringComponent, removeMooringComponent, initShippingLineDropdownList } from '../actions';
import { Dock, Store, MooringComponent, ShippingLine } from '../reducers/State';
import DockBuilder from '../components/DockBuilder';


export interface IDockPageProps {
    mooringComponents: MooringComponent[];
    shippingLines: ShippingLine[];
    addMooringComponent: () => void;
    initShippingLineDropdownList: () => void;
    removeMooringComponent: (number) => void;
    docks: Dock[];
    initDockPage: () => void;
    buildDock: (any) => void;
    demolishDock: (any) => void;
}

class DockPage extends React.Component<IDockPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initDockPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <DockBuilder build={this.props.buildDock} reload={this.props.initDockPage} mooringComponents={this.props.mooringComponents}
                        addMooringComponent={this.props.addMooringComponent} removeMooringComponent={this.props.removeMooringComponent}
                        shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.docks}
                        renderItem={(item: Dock) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishDock({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
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

const mapStateToProps = ({ dockPage, masterPage }: Store) => ({
    docks: dockPage.docks,
    mooringComponents: dockPage.mooringComponents,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initDockPage,
    buildDock,
    demolishDock,
    addMooringComponent,
    removeMooringComponent,
    initShippingLineDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(DockPage);