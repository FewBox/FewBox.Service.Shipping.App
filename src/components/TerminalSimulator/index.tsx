import * as React from 'react';
import Terminal from 'terminal-in-react';
import './style.scss';

export interface ITerminalSimulatorProps {
  executeCommand: any;
  msg: string;
}

export default class TerminalSimulator extends React.Component<ITerminalSimulatorProps, any> {
  public render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Terminal msg={this.props.msg} watchConsoleLogging={true}
          commandPassThrough={(cmd, print) => this.props.executeCommand(cmd, print) } 
        />
      </div>
    );
  }
}
