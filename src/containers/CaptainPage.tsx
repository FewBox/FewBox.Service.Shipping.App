import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initShippingLineDropdownList, initCaptainPage, trainCaptain, fireCaptain } from '../actions';
import CaptainTraining from '../components/CaptainTraining';
import { Store, Captain, ShippingLine } from '../reducers/State';

export interface ICaptainPageProps {
    shippingLines: ShippingLine[];
    captains: Captain[];
    initCaptainPage: () => void;
    trainCaptain: (any) => void;
    fireCaptain: (any) => void;
    initShippingLineDropdownList: () => void;
}

class CaptainPage extends React.Component<ICaptainPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initCaptainPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <CaptainTraining train={this.props.trainCaptain} reload={this.props.initCaptainPage} shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 4 }} dataSource={this.props.captains}
                        renderItem={(item: Captain) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.fireCaptain({ shippingLine: item.shippingLine, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={
                                        <Descriptions size='small' column={1} bordered>
                                            <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                            {item.credentials.map((credential, index) => {
                                                return <Descriptions.Item key={'credential' + index} label={<FormattedMessage id="Label.CredentialItem" values={{ index: index + 1 }} />}>{credential.name}</Descriptions.Item>
                                            })}
                                            <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                        </Descriptions>
                                    } />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ captainPage, masterPage }: Store) => ({
    captains: captainPage.captains,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initShippingLineDropdownList,
    initCaptainPage,
    trainCaptain,
    fireCaptain
};

export default connect(mapStateToProps, mapDispatchToProps)(CaptainPage);