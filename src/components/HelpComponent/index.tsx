import * as React from 'react';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';

export interface IHelpComponentProps {
    isHelp: boolean;
    helpContent: string | ReactNode;
}

export default class HelpComponent extends React.PureComponent<IHelpComponentProps> {
    public render() {
        return (
            <Tooltip placement="topLeft" title={this.props.helpContent} >
                {this.props.children}
            </Tooltip>
        );
    }
}