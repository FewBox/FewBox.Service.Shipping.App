import * as React from 'react';
import * as _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, List, Layout, Tooltip, Menu, Dropdown } from 'antd';
import { initContainerShipPage } from '../actions';
import { Store, ContainerShip } from '../reducers/State';
import { Link } from 'react-router-dom';
import { HOST, PORT } from '../config';


export interface IContainerShipPageProps {
    containerShips: ContainerShip[];
    initContainerShipPage: () => void;
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
                                    <Dropdown.Button overlay={<Menu>
                                        {item.containers.map((container, index) => {
                                            return <Menu.Item key={'contianer' + container}>
                                                <Link to={_.template('/master/terminal/<%= host %>/<%= port %>/<%= namespace %>/<%= pod %>/<%= container %>')({ 'host': HOST, 'port': PORT, 'pod': item.name, 'namespace': item.namespace, 'container': container })}>{container}</Link>
                                            </Menu.Item>
                                        })}
                                    </Menu>} icon={<Icon type="code" />}>
                                        <FormattedMessage id="Navigation.Terminal" />
                                    </Dropdown.Button>
                                ]}>
                                    <Tooltip placement="topLeft" title={item.labels}>
                                        <Card.Meta style={{ height: 40, whiteSpace: 'nowrap' }} title={item.name} description={item.labels} />
                                    </Tooltip>
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
    initContainerShipPage
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerShipPage);