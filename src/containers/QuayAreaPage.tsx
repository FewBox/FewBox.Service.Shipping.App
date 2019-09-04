import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Col, Popconfirm, Switch, List, Layout, Tooltip, Tag, Descriptions, Collapse } from 'antd';
import { initQuayAreaPage, demolishQuayArea, constructQuayArea, initShippingLineDropdownList } from '../actions';
import { QuayArea, Store, ShippingLine } from '../reducers/State';
import QuayAreaConstruction from '../components/QuayAreaConstruction';
import { Specification } from '../jsons';


export interface IQuayAreaPageProps {
    shippingLines: ShippingLine[];
    initShippingLineDropdownList: () => void;
    quayAreas: QuayArea[];
    initQuayAreaPage: () => void;
    constructQuayArea: (any) => void;
    demolishQuayArea: (any) => void;
}

class QuayAreaPage extends React.Component<IQuayAreaPageProps, any> {
    componentDidMount() {
        this.props.initShippingLineDropdownList();
        this.props.initQuayAreaPage();
    }
    render() {
        return (
            <div>
                <Row>
                    <QuayAreaConstruction construct={this.props.constructQuayArea} reload={this.props.initQuayAreaPage}
                        specs={Specification} shippingLines={this.props.shippingLines} />
                </Row>
                <Row>
                    <List grid={{ gutter: 16, column: 3 }} dataSource={this.props.quayAreas}
                        renderItem={(item: QuayArea) => (
                            <List.Item>
                                <Card actions={[
                                    <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.demolishQuayArea({ shippingLine: item.shippingLine, name: item.name }); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                                    <Icon type="help" />,
                                    <Icon type="ellipsis" />]}>
                                    <Card.Meta style={{ whiteSpace: 'nowrap' }} title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                        <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                            <Descriptions size='small' column={1} bordered>
                                                <Descriptions.Item label={<FormattedMessage id="Label.ShippingLine" />}>{item.shippingLine}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.ContainerShipSpec" />}>{item.containerShipSpec}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Position" />}>{item.position}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Type" />}>{item.type}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.ContainerShipAgreementType" />}>{item.containerShipAgreementType}</Descriptions.Item>
                                                <Descriptions.Item label={<FormattedMessage id="Label.Age" />}>{item.age}</Descriptions.Item>
                                            </Descriptions>
                                        </Collapse.Panel>
                                        <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
                                            <Descriptions size='small' column={1} bordered>
                                                {item.berthes.map((berth, index) => {
                                                    return <Descriptions.Item key={'berth' + index} label={<FormattedMessage id="Label.BerthItem" values={{ key: berth.name }} />}>{berth.crane}=>{berth.cellGuide}</Descriptions.Item>
                                                })}
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

const mapStateToProps = ({ quayAreaPage, masterPage }: Store) => ({
    quayAreas: quayAreaPage.quayAreas,
    shippingLines: masterPage.shippingLines
});

const mapDispatchToProps = {
    initQuayAreaPage,
    constructQuayArea,
    demolishQuayArea,
    initShippingLineDropdownList
};

export default connect(mapStateToProps, mapDispatchToProps)(QuayAreaPage);