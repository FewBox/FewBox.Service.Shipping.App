import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Tooltip } from 'antd';

export interface IHelpFormattedMessageProps {
    isHelp: boolean;
    helpId: string;
    id: string;
    intl: any;
    values?: any;
    helpValues?: any;
}

class HelpFormattedMessage extends React.PureComponent<IHelpFormattedMessageProps> {
    public render() {
        if (this.props.isHelp) {
            return (<Tooltip placement="topLeft" title={<FormattedMessage id={this.props.helpId} values={this.props.helpValues} />} >
                <span>{this.props.intl.formatMessage({ id: this.props.id }, this.props.values)}</span>
            </Tooltip>);
        }
        else {
            return (<FormattedMessage id={this.props.id} values={this.props.values} />);
        }

    }
}

export default injectIntl(HelpFormattedMessage);
