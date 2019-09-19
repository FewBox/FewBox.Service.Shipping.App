import * as React from 'react';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';

export interface IHelpComponentProps {
    isHelp: boolean;
    helpContent: string | ReactNode;
}

export default class HelpComponent extends React.PureComponent<IHelpComponentProps> {
    public render() {
        if (this.props.isHelp) {
            return (
                <Tooltip placement="topLeft" title={this.props.helpContent} >
                    {this.props.children}
                </Tooltip>
            );
        } else {
            return (
                <Tooltip placement="topLeft" title={this.props.helpContent} visible={false} >
                    {this.props.children}
                </Tooltip>
            );
        }
    }
}