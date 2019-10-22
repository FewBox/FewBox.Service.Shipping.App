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
    gateways: Gateway[];
    services: Service[];
    deployments: Deployment[];
    matchOptions: Option[];
    refreshGateways: (namespaceName: string) => void;
    refreshServices: (namespaceName: string) => void;
    refreshDeployments: (app: string) => void;
    create: (string) => void;
    reload: () => void;
    form: any;
    isHelp: boolean;
}

class VirtualServiceCreation extends React.PureComponent<IVirtualServiceCreationProps> {
    changeNamespace = (namespaceName: string) => {
        this.props.refreshGateways(namespaceName);
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
                let https = values.https.map((http, index) => {
                    let uris = data.uris && data.uris[index] ? data.uris[index].map((uri, uriIndex) => {
                        return { [data.uriTypes[index][uriIndex]]: uri };
                    }) : null;
                    let headers = data.headers && data.headers[index] ? data.headers[index].map((header, headerIndex) => {
                        let name = data.headerNames[index][headerIndex];
                        return { [name]: { [data.headerTypes[index][headerIndex]]: header } };
                    }) : null;
                    let routes = data.routes && data.routes[index] ? data.routes[index].map((route, routeIndex) => {
                        return { host: route, port: data.ports[index][routeIndex], subset: data.versions[index][routeIndex] };
                    }) : null;
                    let rewrite = { uri: data.rewrite[index] };
                    return { uris: uris, headers: headers, rewrite: rewrite, routes: routes };
                });
                this.props.create({ namespace: values.namespace, name: values.name, hosts: values.hosts, gateways: values.gateways, https: https });
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
                            <NamespaceDropdownList onChange={this.changeNamespace} isHelp={this.props.isHelp} form={this.props.form} namespaces={this.props.namespaces} />
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
                                {getFieldDecorator(`hosts[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.HostRequired' /> }],
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Host" />
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Host" />} />
                <DynamicFieldList fieldName='gateway' itemComponents={(k) =>
                    [<Col span={6} key={1}>
                        <Form.Item>
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Gateway' />}>
                                {getFieldDecorator(`gateways[${k}]`, {
                                    rules: [{ required: true, message: <FormattedMessage id='Message.GatewayRequired' /> }],
                                })(
                                    <Select showSearch placeholder={<FormattedMessage id='Label.Gateway' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                        {this.props.gateways ? this.props.gateways.map((item, index) => {
                                            return <Select.Option key={'gateway' + index} value={item.name}>{item.name}</Select.Option>
                                        }) : null}
                                    </Select>
                                )}
                            </HelpComponent>
                        </Form.Item>
                    </Col>]
                } form={this.props.form} addCaption={<FormattedMessage id="Label.Gateway" />} />
                <DynamicFieldList fieldName='https' itemComponents={(k1) =>
                    [<Col offset={1} span={6} key={1}>
                        <Form.Item>
                            <DynamicFieldList fieldName={'uri' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Match' />}>
                                            {getFieldDecorator(`uriTypes[${k1}][${k2}]`, {
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
                                            {getFieldDecorator(`uris[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.InformationRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Information" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Uri" />} />
                            <DynamicFieldList fieldName={'header' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Header' />}>
                                            {getFieldDecorator(`headerNames[${k1}][${k2}]`, {
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
                                            {getFieldDecorator(`headerTypes[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.TypeRequired' /> }],
                                            })(
                                                <Select showSearch placeholder={<FormattedMessage id='Label.Type' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
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
                                            {getFieldDecorator(`headers[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.HeaderValueRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Header Value" />
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Header" />} />
                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Rewrite' />}>
                                {getFieldDecorator(`rewrite[${k1}]`, {
                                    rules: [{ required: false, message: <FormattedMessage id='Message.RewriteRequired' /> }],
                                })(
                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Rewrite" />
                                )}
                            </HelpComponent>
                            <DynamicFieldList fieldName={'http' + k1} itemComponents={(k2) =>
                                [<Col key={1}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Service' />}>
                                            {getFieldDecorator(`routes[${k1}][${k2}]`, {
                                                rules: [{ required: true, message: <FormattedMessage id='Message.RouteRequired' /> }],
                                            })(
                                                <Select showSearch onChange={this.changeDeployment} placeholder={<FormattedMessage id='Label.Service' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                    {this.props.services ? this.props.services.map((item, index) => {
                                                        return <Select.Option key={'route' + index} value={item.name}>{item.name}</Select.Option>
                                                    }) : null}
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>,
                                <Col key={2}>
                                    <Form.Item>
                                        <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Port' />}>
                                            {getFieldDecorator(`ports[${k1}][${k2}]`, {
                                                rules: [{ required: false, message: <FormattedMessage id='Message.PortRequired' /> }],
                                            })(
                                                <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Port" />
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
                                                    {this.props.deployments ? this.props.deployments.map((item, index) => {
                                                        return <Select.Option key={'deployment' + index} value={item.version}>{item.name}</Select.Option>
                                                    }) : null}
                                                </Select>
                                            )}
                                        </HelpComponent>
                                    </Form.Item>
                                </Col>]
                            } form={this.props.form} addCaption={<FormattedMessage id="Label.Route" />} />
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