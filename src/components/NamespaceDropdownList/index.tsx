import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import HelpComponent from '../HelpComponent';
import { Select } from 'antd';
import { ShippingLineIcon } from '../Icon';
import { Namespace } from '../../reducers/State';

export interface INamespaceDropdownListProps {
  namespaces: Namespace[];
  isHelp: boolean;
  getFieldDecorator: any;
}

export default class NamespaceDropdownList extends React.PureComponent<INamespaceDropdownListProps> {
  public render() {
    return (
      <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.Namespace" />}>
        {this.props.getFieldDecorator('namespace', {
          rules: [{ required: true, message: <FormattedMessage id='Message.NamespaceRequired' /> }],
        })(
          <Select showSearch placeholder={<FormattedMessage id='Label.Namespace' />} optionFilterProp="children" suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
            {this.props.namespaces.map((item, index) => {
              return <Select.Option key={'namespace' + index} value={item.name}>{item.name}</Select.Option>
            })}
          </Select>
        )}
      </HelpComponent>
    );
  }
}
