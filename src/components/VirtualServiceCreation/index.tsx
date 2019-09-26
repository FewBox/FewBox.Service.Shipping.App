import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Select, Input, Button } from 'antd';
import { Namespace, Gateway, Service, Deployment, Option } from '../../reducers/State';
import { BrandIcon } from '../Icon';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';
import NamespaceDropdownList from '../NamespaceDropdownList';

export interface IVirtualServiceCreationProps {
    namespaces: Namespace[];
    gatewaies: Gateway[];
    services: Service[];
    deplyments: Deployment[];
    matchOptions: Option[];
    refreshGatewaies: (namespaceName: string) => void;
    refreshServices: (namespaceName: string) => void;
    refreshDeployments: (identificationCode: string) => void;
    create: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class VirtualServiceCreation extends React.PureComponent<IVirtualServiceCreationProps> {
    changeNamespace = (namespaceName: string) => {
        this.props.refreshGatewaies(namespaceName);
        this.props.refreshServices(namespaceName);
    };
    changeDeployment = (app: string) => {
        this.props.refreshDeployments(app);
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = values;
                let guideboards = values.guideboard.map((guideboard, index) => {
                    let targets = data.targets && data.targets[index] ? data.targets[index].map((target, targetIndex) => {
                        return { [data.targetTypes[index][targetIndex]]: target };
                    }) : null;
                    let tagTargets = data.tagTargets && data.tagTargets[index] ? data.tagTargets[index].map((tagTarget, tagTargetIndex) => {
                        let name = data.tagTargetNames[index][tagTargetIndex];
                        return { [name]: { [data.tagTargetTypes[index][tagTargetIndex]]: tagTarget } };
                    }) : null;
                    let routes = data.directionQuayAreas && data.directionQuayAreas[index] ? data.directionQuayAreas[index].map((directionQuayArea, directionQuayAreaIndex) => {
                        return { quayArea: directionQuayArea, crane: data.directionCranes[index][directionQuayAreaIndex], numbering: data.versions[index][directionQuayAreaIndex] };
                    }) : null;
                    return { targets: targets, tagTargets: tagTargets, directions: routes };
                });
                this.props.create({ namespace: values.namespace, name: values.name, aliases: values.aliases, gateAreas: values.gateAreas, guideboards: guideboards });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <NamespaceDropdownList isHelp={this.props.isHelp} form={this.props.form} namespaces={this.props.namespaces} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: <FormattedMessage id='Message.NameRequired' /> }],
                            })(
                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <DynamicFieldList fieldName='alias' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Host' />}>
                                {getFieldDecorator(`aliases[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.AliasRequired' /> }],
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Alias" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Host" />} />
                <DynamicFieldList fieldName='gateArea' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Gateway' />}>
                                {getFieldDecorator(`gateAreas[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.GateAreaRequired' /> }],
                                })(
                                    <Select showSearch placeholder="GateArea" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.gatewaies ? this.props.gatewaies.map((item, index) => {
                                            return <Select.Option key={'gateArea' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Gateway" />} />
                <DynamicFieldList fieldName='guideboard' itemComponents={(k1) =>
                    [<Col offset={1} span={6} key={1}>
                        <Form.Item>
                            <DynamicFieldList fieldName={'target' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Match' />}>
                                            {getFieldDecorator(`targetTypes[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.TypeRequired' /> }],
                                            })(
                                                <Select showSearch placeholder="Type" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                    {this.props.matchOptions ? this.props.matchOptions.map((item, index) => {
                                                        return <Select.Option key={'match' + index} value={item.value}>{item.name}</Select.Option>
                                                    }) : null}
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={2}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Uri' />}>
                                            {getFieldDecorator(`targets[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.InformationRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Information" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Uri" />} />
                            <DynamicFieldList fieldName={'tagTarget' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Header' />}>
                                            {getFieldDecorator(`tagTargetNames[${k1}][${k2}]`, {
                                                rules: [{ required: false, message: <FormattedMessage id='Message.NameRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={2}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.MatchType' />}>
                                            {getFieldDecorator(`tagTargetTypes[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.TypeRequired' /> }],
                                            })(
                                                <Select showSearch placeholder="Type" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                    {this.props.matchOptions ? this.props.matchOptions.map((item, index) => {
                                                        return <Select.Option key={'match' + index} value={item.value}>{item.name}</Select.Option>
                                                    }) : null}
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={3}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.HeaderValue' />}>
                                            {getFieldDecorator(`tagTargets[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.TagTargetRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tag Target" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.TagTarget" />} />
                            <DynamicFieldList fieldName={'direction' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Service' />}>
                                            {getFieldDecorator(`directionQuayAreas[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.QuayAreaRequired' /> }],
                                            })(
                                                <Select showSearch onChange={this.changeDeployment} placeholder="QuayArea" optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                    {this.props.services ? this.props.services.map((item, index) => {
                                                        return <Select.Option key={'quayArea' + index} value={item.name}>{item.name}</Select.Option>
                                                    }) : null}
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={2}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                            {getFieldDecorator(`directionCranes[${k1}][${k2}]`, {
                                                rules: [{ required: false, message: <FormattedMessage id='Message.CraneRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Crane" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={3}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Deployment' />}>
                                            {getFieldDecorator(`versions[${k1}][${k2}]`, {
                                                rules: [{ required: false, message: <FormattedMessage id='Message.DeploymentRequired' /> }],
                                            })(
                                                <Select showSearch placeholder={<FormattedMessage id='Label.Deployment' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                    {this.props.deplyments ? this.props.deplyments.map((item, index) => {
                                                        return <Select.Option key={'deployment' + index} value={item.version}>{item.name}</Select.Option>
                                                    }) : null}
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Port" />} />
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Http" />} />
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            <Button type="primary" shape="circle" icon="plus" htmlType="submit" />
                            <Button type="primary" shape="circle" icon="reload" style={{ marginLeft: 8 }} onClick={this.props.reload} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default connect()(Form.create({ name: 'virtualservice_creation' })(VirtualServiceCreation));