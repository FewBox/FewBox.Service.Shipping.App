import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initCaptainPage } from '../actions';
import { Store, Captain } from '../reducers/State';

export interface ICaptainPageProps {
    captains: Captain[];
    initCaptainPage: () => void;
}

class CaptainPage extends React.Component<ICaptainPageProps, any> {
    componentDidMount() {
        this.props.initCaptainPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.captains}
                        renderItem={(item: Captain) => (
                            <List.Item>
                                <Card actions={[
                                    <Icon type="help" />,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} />
                                    <Descriptions size='small' column={1} bordered>
                                        <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                        {item.credentials.map((credential, index) => {
                                            return <Descriptions.Item key={'credential' + index} label={<FormattedMessage id="Label.CredentialItem" values={{ index: index + 1 }} />}>{credential.name}</Descriptions.Item>
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

const mapStateToProps = ({ captainPage }: Store) => ({
    captains: captainPage.captains
});

const mapDispatchToProps = {
    initCaptainPage
};

export default connect(mapStateToProps, mapDispatchToProps)(CaptainPage);