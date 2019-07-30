import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, List, Layout, Tooltip, Menu, Dropdown, Tag, Popconfirm } from 'antd';
import { initContainerShipPage, sinkContainerShip } from '../actions';
import { Store, ContainerShip } from '../reducers/State';
import { Link } from 'react-router-dom';
import { HOST, PORT } from '../config';


export interface IContainerShipPageProps {
    containerShips: ContainerShip[];
    initContainerShipPage: () => void;
    sinkContainerShip: (any) => void;
}

class ContainerShipPage extends React.Component<IContainerShipPageProps, any> {
    componentDidMount() {
        this.props.initContainerShipPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.containerShips}
                        renderItem={(item: ContainerShip) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.sinkContainerShip({ shippingLine: item.shippingLine, name: item.name }) }} okText={<FormattedMessage id="Layout.OK" />} cancelText={<FormattedMessage id="Layout.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Dropdown disabled={item.condition != 'Running'} overlay={<Menu>
                                        {item.containers.map((container, index) => {
                                            return <Menu.Item key={'contianer' + container}>
                                                <Link to={_.template('/master/terminal/<%= host %>/<%= port %>/<%= namespace %>/<%= pod %>/<%= container %>')({ 'host': HOST, 'port': PORT, 'pod': item.name, 'namespace': item.shippingLine, 'container': container })}>{container}</Link>
                                            </Menu.Item>
                                        })}
                                    </Menu>}>
                                        <Icon type="code" />
                                    </Dropdown>,
                                    <Icon type="ellipsis" />
                                ]}>
                                    <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} description={<Tooltip placement="topLeft" title={item.description}><Tag color={item.condition == 'Running' ? 'green' : 'red'}>{item.condition}</Tag></Tooltip>} />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ containerShipPage }: Store) => ({
    containerShips: containerShipPage.containerShips
});

const mapDispatchToProps = {
    initContainerShipPage,
    sinkContainerShip
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerShipPage);