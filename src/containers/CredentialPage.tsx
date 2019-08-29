import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse, Popover, Button } from 'antd';
import { initShippingLineDropdownList, initCredentialPage, issueCredential, revokeCredential } from '../actions';
import CredentialIssued from '../components/CredentialIssued';
import { Store, Credential, ShippingLine } from '../reducers/State';

export interface ICredentialPageProps {
    shippingLines: ShippingLine[];
    credentials: Credential[];
    initCredentialPage: () => void;
    issueCredential: (any) => void;
    revokeCredential: (any) => void;
    initShippingLineDropdownList: () => void;
}

class CredentialPage extends React.Component<ICredentialPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initCredentialPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <CredentialIssued issue={this.props.issueCredential} reload={this.props.initCredentialPage} shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.credentials}
                        renderItem={(item: Credential) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.revokeCredential({ shippingLine: item.shippingLine, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={
                                        <Descriptions size='small' column={1} bordered>
                                            <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                            <Descriptions.Item label={<FormattedMessage id="Label.Type" />}>{item.type}</Descriptions.Item>
                                            {Object.keys(item.stamps).map((key, index) => {
                                                return <Descriptions.Item key={'stamp' + index} label={<FormattedMessage id="Label.StampItem" values={{ key: key }} />}>
                                                    <Popover title={key} trigger="click" content={atob(item.stamps[key])}>
                                                        <Button type="primary" icon='eye'></Button>
                                                    </Popover>
                                                </Descriptions.Item>
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

const mapStateToProps = ({ credentialPage, masterPage }: Store) => ({
    credentials: credentialPage.credentials,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initShippingLineDropdownList,
    initCredentialPage,
    issueCredential,
    revokeCredential
};

export default connect(mapStateToProps, mapDispatchToProps)(CredentialPage);