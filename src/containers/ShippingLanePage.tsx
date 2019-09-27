import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  NamespaceIcon, ServiceIcon, DeploymentIcon, PodIcon, GatewayIcon, ServiceAccountIcon, SecretIcon,
  VirtualServiceIcon, DestinationRuleIcon, ServiceEntryIcon
} from '../components/Icon';
import { Steps, Button } from 'antd';

export interface IShippingLanePageProps {
}

const steps = [
  {
    icon: <NamespaceIcon />,
    title: 'Namespace',
    content: 'Startup one Shipping Line.',
  },
  {
    icon: <ServiceIcon />,
    title: 'Service',
    content: 'Construct the Quay Area to mooring the Container Ship.',
  },
  {
    icon: <ServiceEntryIcon />,
    title: 'ServiceEntry',
    content: 'Construct the Warehouse Area to connect the ex.',
  },
  {
    icon: <DeploymentIcon />,
    title: 'Deployment',
    content: 'Construct the Shipyard to build Container Ship.',
  }
];

class ShippingLanePage extends React.Component<IShippingLanePageProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  home() {
    this.setState({ current: 0 });
  }

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Steps.Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              <FormattedMessage id='Label.Next' />
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => this.home()}>
              <FormattedMessage id='Label.Done' />
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              <FormattedMessage id='Label.Previous' />
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default ShippingLanePage;