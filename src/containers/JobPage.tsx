import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Card, Icon, Row, Popconfirm, List, Descriptions, Collapse, Popover, Button } from 'antd';
import { initNamespaceDropdownList, initJobPage, createJob, deleteJob } from '../actions';
import JobCreation from '../components/JobCreation';
import { Store, Secret, Namespace, Job } from '../reducers/State';
import HelpFormattedMessage from '../components/HelpFormattedMessage';
import ResourcesCard from '../components/ResourcesCard';

export interface ISecretPageProps {
    namespaces: Namespace[];
    jobs: Job[];
    initJobPage: () => void;
    createJob: (any) => void;
    deleteJob: (any) => void;
    initNamespaceDropdownList: () => void;
    isHelp: boolean;
    isListLoading: boolean;
}

class JobPage extends React.Component<ISecretPageProps, any> {
    componentDidMount() {
        this.props.initNamespaceDropdownList();
        this.props.initJobPage();
    }
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <JobCreation isHelp={this.props.isHelp} create={this.props.createJob} reload={this.props.initJobPage} />
                </Row>
                <Row gutter={16}>
                    <ResourcesCard isLoading={this.props.isListLoading} resources={this.props.jobs}
                        renderActions={(item) => [
                            <Popconfirm title={<FormattedMessage id="Confirm.Delete" values={{ name: item.name }} />} onConfirm={() => { this.props.deleteJob({ namespace: item.namespace, name: item.name }) }} okText={<FormattedMessage id="Label.OK" />} cancelText={<FormattedMessage id="Label.Cancel" />}><Icon type="delete" /></Popconfirm>,
                            <Icon type="help" />,
                            <Icon type="ellipsis" />]}
                        renderBasic={(item) => <Descriptions size='small' column={1} bordered>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Namespace" helpId="Help.Namespace" />}>{item.namespace}</Descriptions.Item>
                            <Descriptions.Item label={<HelpFormattedMessage isHelp={this.props.isHelp} id="Label.Age" helpId="Help.Age" />}>{item.age}</Descriptions.Item>
                        </Descriptions>}
                        renderMore={(item) => <Descriptions size='small' column={1} bordered>
                        </Descriptions>}
                    />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ jobPage, masterPage, settingPage }: Store) => ({
    jobs: jobPage.jobs,
    isListLoading: jobPage.isListLoading,
    namespaces: masterPage.namespaces,
    isHelp: settingPage.isHelp
});

const mapDispatchToProps = {
    initNamespaceDropdownList,
    initJobPage,
    createJob,
    deleteJob
};

export default connect(mapStateToProps, mapDispatchToProps)(JobPage);