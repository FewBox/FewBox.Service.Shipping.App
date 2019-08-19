import * as React from 'react';
import Terminal from 'terminal-in-react';
import './style.scss';

export interface ITerminalSimulatorProps {
  executeCommand: any;
  msg: string;
  promptSymbol: string;
}

export default class TerminalSimulator extends React.Component<ITerminalSimulatorProps, any> {
  public render() {
    return (
      <div>
        <Terminal color='green'
          backgroundColor='black'
          barColor='black'
          startState='maximised'
          style={{ fontWeight: "bold", fontSize: "1em" }} msg={this.props.msg} watchConsoleLogging={true} hideTopBar={true} showActions={false}
          promptSymbol={this.props.promptSymbol} commandPassThrough={(cmd, print) => this.props.executeCommand(cmd, print)}
        />
      </div>
    );
  }
}
