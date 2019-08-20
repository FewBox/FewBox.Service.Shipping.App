import * as React from 'react';
import Terminal from 'terminal-in-react';
import { HotKeys } from "react-hotkeys";
import './style.scss';

export interface ITerminalSimulatorProps {
  executeCommand: any;
  msg: string;
  promptSymbol: string;
  stop: () => void;
}

const keyMap = {
  STOP_COMMAND: 'ctrl+c'
};

export default class TerminalSimulator extends React.Component<ITerminalSimulatorProps, any> {
  public render() {
    let handlers = {
      STOP_COMMAND: event => this.props.stop()
    };
    return (
      <div>
        <HotKeys keyMap={keyMap} handlers={handlers}>
          <Terminal color='green'
            backgroundColor='black'
            barColor='black'
            startState='maximised'
            style={{ fontWeight: "bold", fontSize: "1em" }} msg={this.props.msg} watchConsoleLogging={true} hideTopBar={true} showActions={false}
            promptSymbol={this.props.promptSymbol}
            commandPassThrough={(cmd, print) => this.props.executeCommand(cmd, print)}
          />
        </HotKeys>
      </div>
    );
  }
}
