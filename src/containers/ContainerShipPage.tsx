import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, List, Layout, Tooltip, Menu, Dropdown, Tag, Popconfirm, Button, Descriptions, Badge } from 'antd';
import { initContainerShipPage, sinkContainerShip, constructTemporaryContainerShip, initShippingLineDropdownList, showDrawer } from '../actions';
import { Store, ContainerShip, ShippingLine } from '../reducers/State';
import { Link } from 'react-router-dom';
import ShipBuilding from '../components/ShipBuilding';
import SubMenu from 'antd/lib/menu/SubMenu';

export interface IContainerShipPageProps {
    shippingLines: ShippingLine[];
    containerShips: ContainerShip[];
    showDrawer: () => void;
    initShippingLineDropdownList: () => void;
    initContainerShipPage: () => void;
    sinkContainerShip: (any) => void;
    constructTemporaryContainerShip: (any) => void;
}

class ContainerShipPage extends React.Component<IContainerShipPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initContainerShipPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <ShipBuilding construct={this.props.constructTemporaryContainerShip} reload={this.props.initContainerShipPage} shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.containerShips}
                        renderItem={(item: ContainerShip) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.sinkContainerShip({ shippingLine: item.shippingLine, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Dropdown disabled={item.status != 'Running'} overlay={<Menu>
                                        {item.containers.map((container, index) => {
                                            return <SubMenu key={'contianer-shell' + index} title={container}>
                                                <Menu.Item>
                                                    <Link to={_.template('/master/terminal/<%= namespace %>/<%= pod %>/<%= container %>/<%= command %>')({ 'pod': item.name, 'namespace': item.shippingLine, 'container': container, 'command': btoa('/bin/bash') })}>{<FormattedMessage id="Label.Bash" />}</Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link to={_.template('/master/terminal/<%= namespace %>/<%= pod %>/<%= container %>/<%= command %>')({ 'pod': item.name, 'namespace': item.shippingLine, 'container': container, 'command': btoa('/bin/sh') })}>{<FormattedMessage id="Label.Sh" />}</Link>
                                                </Menu.Item>
                                            </SubMenu>
                                        })}
                                    </Menu>}>
                                        <Icon type="code" />
                                    </Dropdown>,
                                    <Dropdown overlay={<Menu>
                                        <SubMenu title='Log'>
                                            {item.containers.map((container, index) => {
                                                return <Menu.Item key={'contianer-log' + index}>
                                                    <Link to={_.template('/master/logbook/<%= namespace %>/<%= pod %>/<%= container %>')({ 'pod': item.name, 'namespace': item.shippingLine, 'container': container })}>{container}</Link>
                                                </Menu.Item>
                                            })}
                                        </SubMenu>
                                        <SubMenu title='Normal'>
                                            <Menu.Item>
                                                <Button icon="more">Detail</Button>
                                            </Menu.Item>
                                        </SubMenu>
                                    </Menu>}>
                                        <a className="ant-dropdown-link" href="#">
                                            <Icon type="ellipsis" />
                                        </a>
                                    </Dropdown>
                                ]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} />
                                    <Descriptions size='small' column={1} bordered>
                                        <Descriptions.Item label={<FormattedMessage id="Label.Status" />}><Badge color={item.status === 'Running' ? 'green' : 'red'} text={item.status} /></Descriptions.Item>
                                        <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                        <Descriptions.Item label={<FormattedMessage id="Label.Country" />}>{item.country}</Descriptions.Item>
                                        <Descriptions.Item label={<FormattedMessage id="Label.CountryPosition" />}>{item.countryPosition}</Descriptions.Item>
                                        <Descriptions.Item label={<FormattedMessage id="Label.Position" />}>{item.position}</Descriptions.Item>
                                        {item.containers.map((container, index) => {
                                            return <Descriptions.Item key={'cargo' + index} label={<FormattedMessage id="Label.CargoItem" values={{ index: index + 1 }} />}>{container}</Descriptions.Item>
                                        })}
                                        <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ containerShipPage, masterPage }: Store) => ({
    containerShips: containerShipPage.containerShips,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initShippingLineDropdownList,
    initContainerShipPage,
    sinkContainerShip,
    constructTemporaryContainerShip,
    showDrawer
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerShipPage);