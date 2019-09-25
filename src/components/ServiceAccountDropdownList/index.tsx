import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import HelpComponent from '../HelpComponent';
import { Select } from 'antd';
import { CaptainIcon } from '../Icon';
import { ServiceAccount } from '../../reducers/State';

export interface IServiceAccountDropdownListDropdownListProps {
  serviceAccounts: ServiceAccount[];
  isHelp: boolean;
  form: any;
}

export default class ServiceAccountDropdownList extends React.PureComponent<IServiceAccountDropdownListDropdownListProps> {
  public render() {
    return (
      <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id="Help.ServiceAccount" />}>
        {this.props.form.getFieldDecorator('serviceAccount', {
          rules: [{ required: true, message: <FormattedMessage id='Message.ServiceAccountRequired' /> }],
        })(
          <Select showSearch placeholder={<FormattedMessage id='Label.ServiceAccount' />} optionFilterProp="children" suffixIcon={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
            {this.props.serviceAccounts.map((item, index) => {
              return <Select.Option key={'serviceAccount' + index} value={item.name}>{item.name}</Select.Option>
            })}
          </Select>
        )}
      </HelpComponent>
    );
  }
}
