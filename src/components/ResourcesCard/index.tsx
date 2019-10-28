import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { List, Card, Collapse } from 'antd';

export interface IResourcesCardProps {
    isLoading: boolean;
    resources: any[];
    renderActions: (item) => React.ReactNode[];
    renderBasic: (item) => React.ReactNode;
    renderMore?: (item) => React.ReactNode;
}

export default class ResourcesCard extends React.PureComponent<IResourcesCardProps> {
    render() {
        return (
            <List loading={this.props.isLoading} grid={{ gutter: 16, column: 3 }} dataSource={this.props.resources}
                renderItem={(item: any) => (
                    <List.Item>
                        <Card hoverable actions={this.props.renderActions(item)}>
                            <Card.Meta title={item.name} description={<Collapse bordered={false} defaultActiveKey={['1']}>
                                <Collapse.Panel header={<FormattedMessage id="Label.Basic" />} key='1'>
                                    {this.props.renderBasic(item)}
                                </Collapse.Panel>
                                <Collapse.Panel header={<FormattedMessage id="Label.More" />} key='2'>
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
