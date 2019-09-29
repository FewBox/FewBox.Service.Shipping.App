import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';

export interface IJobCreationProps {
    isHelp: boolean;
    create: (any) => void;
    reload: () => void;
    form: any;
}

class JobCreation extends React.PureComponent<IJobCreationProps> {
    public render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect()(Form.create({ name: 'job_created' })(JobCreation));