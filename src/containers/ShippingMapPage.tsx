import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Popconfirm, Icon, List, Card } from 'antd';
import { ShippingLane, Store } from '../reducers/State';
import { FormattedMessage } from 'react-intl';
import { InstallIcon } from '../components/Icon';

export interface IShippingMapPageProps {
  shippingLanes: ShippingLane[];
  isListLoading: boolean;
  deleteMap: (string) => void;
}

class ShippingMapPage extends React.Component<IShippingMapPageProps, any> {
  render() {
    return (
      <div>
        <Row gutter={16}>
          <List loading={this.props.isListLoading} grid={{ gutter: 16, column: 6 }} dataSource={this.props.shippingLanes}
            renderItem={(item: ShippingLane) => (
              <List.Item>
                <Card hoverable actions={[
                  <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteMap(item.name); }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                  <InstallIcon />,
                  <Icon type="ellipsis" />]} cover={<div style={{ height: 200, backgroundImage: `url(${item.logo})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>}
                >
                  <Card.Meta title={item.name} />
                </Card>
              </List.Item>
            )}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ shippingMapPage }: Store) => ({
  shippingLanes: shippingMapPage.shippingLanes,
  isListLoading: shippingMapPage.isListLoading
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingMapPage);