import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { List, Card, Collapse, Icon } from 'antd';

export interface IResourcesCardProps {
    isLoading: boolean;
    resources: any[];
    renderActions: (item) => React.ReactNode[];
    renderBasic: (item) => React.ReactNode;
    renderTitle?: (item) => React.ReactNode;
    renderMore?: (item) => React.ReactNode;
}

export default class ResourcesCard extends React.PureComponent<IResourcesCardProps> {
    render() {
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        return (
            <List loading={this.props.isLoading} grid={{ gutter: 16, column: 3 }} dataSource={this.props.resources}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card hoverable actions={this.props.renderActions(item)}>
                            <Card.Meta title={this.props.renderTitle ? this.props.renderTitle(item) : item.name} description={<Collapse bordered={false} defaultActiveKey={[]} expandIconPosition='right'
                                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
                                <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1' style={customPanelStyle}>
                                    {this.props.renderBasic(item)}
                                </Collapse.Panel>
                                <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2' style={customPanelStyle}>
                                    {this.props.renderMore ? this.props.renderMore(item) : null}
                                </Collapse.Panel>
                            </Collapse>} />
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}
