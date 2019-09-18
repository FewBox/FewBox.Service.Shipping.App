import * as React from 'react';
import { Tooltip } from 'antd';
import { ReactNode } from 'react';

export interface IHelpProps {
    isHelp: boolean;
    helpContent: string | ReactNode;
}

export default class Help extends React.PureComponent<IHelpProps> {
    public render() {
        return (
            <Tooltip placement="right" title={this.props.helpContent} visible={this.props.isHelp} >
                {this.props.children}
            </Tooltip>
        );
    }
}
