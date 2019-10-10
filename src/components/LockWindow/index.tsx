import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, Button } from 'antd';

export interface ILockWindowProps {
    isVisiable: boolean;
    signIn: (username, password) => void;
    close: () => void;
}

class LockWindow extends React.PureComponent<ILockWindowProps> {
    public render() {
        return (
            <Modal visible={this.props.isVisiable} title={<FormattedMessage id='Label.Lock' />} onCancel={this.props.close}
                footer={[
                    <Button key="submit" type="primary"><FormattedMessage id='Label.SignIn' /></Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}

export default LockWindow;