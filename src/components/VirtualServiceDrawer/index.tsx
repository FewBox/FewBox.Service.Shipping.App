import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Button, Select } from 'antd';
import { BrandIcon } from '../Icon';
import { SelectedVirtualService, Http, Option, Service, Deployment, Gateway } from '../../reducers/State';
import DynamicFieldList from '../DynamicFieldList';
import HelpComponent from '../HelpComponent';

export interface IVirtualServiceDrawerProps {
    selectedVirtualService: SelectedVirtualService;
    matchOptions: Option[];
    changeVirtualServiceHttp: (any) => void;
    refreshDeployments: (app: string) => void;
    namespace: string;
    name: string;
    form: any;
    isHelp: false;
}

class VirtualServiceDrawer extends React.PureComponent<IVirtualServiceDrawerProps> {
    changeDeployment = (app: string) => {
        this.props.refreshDeployments(app);
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data = values;
                let https = values.selectedhttps.map((http, index) => {
                    let uris = data.uris && data.uris[index] ? data.uris[index].map((uri, uriIndex) => {
                        return { uri: { [data.uriTypes[index][uriIndex]]: uri } };
                    }) : null;
                    let headers = data.headers && data.headers[index] ? data.headers[index].map((header, headerIndex) => {
                        let name = data.headerNames[index][headerIndex];
                        return { [name]: { [data.headerTypes[index][headerIndex]]: header } };
                    }) : null;
                    let routes = data.routes && data.routes[index] ? data.routes[index].map((route, routeIndex) => {
                        return { destination: { host: route, port: { number: parseInt(data.ports[index][routeIndex]) }, subset: data.versions[index][routeIndex] } };
                    }) : null;
                    if (uris || headers) {
                        let match;
                        if (uris) {
                            match = uris;
                        }
                        else {
                            match = headers;
                        }
                        return { match: match, route: routes, rewrite: { uri: data.rewrite[index] } };
                    }
                    else {
                        return { route: routes };
                    }
                });
                this.props.changeVirtualServiceHttp({ namespace: this.props.namespace, name: this.props.name, https: https, hosts: values.hosts, gateways: values.gateways });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <DynamicFieldList fieldName='selectedhosts' initialItems={this.props.selectedVirtualService.hosts} itemComponents={(index, host: string) =>
                        [<Col offset={1} span={12} key={1}>
                            <Form.Item>
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Host' />}>
                                    {getFieldDecorator(`hosts[${index}]`, {
                                        rules: [{ required: true, message: <FormattedMessage id='Message.HostRequired' /> }],
                                        initialValue: host
                                    })(
                                        <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Host" />
                                    )}
                                </HelpComponent>
                            </Form.Item>
                        </Col>]
                    } form={this.props.form} addCaption={<FormattedMessage id="Label.Host" />} />
                    <DynamicFieldList fieldName='selectedgateway' initialItems={this.props.selectedVirtualService.gateways} itemComponents={(index, item: string) =>
                        [<Col offset={1} span={12} key={1}>
                            <Form.Item>
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Gateway' />}>
                                    {getFieldDecorator(`gateways[${index}]`, {
                                        rules: [{ required: true, message: <FormattedMessage id='Message.GatewayRequired' /> }],
                                        initialValue: item
                                    })(
                                        <Select showSearch placeholder={<FormattedMessage id='Label.Gateway' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                            {this.props.selectedVirtualService.allGateways ? this.props.selectedVirtualService.allGateways.map((gateway: Gateway, index) => {
                                                return <Select.Option key={'gateway' + index} value={gateway.name}>{gateway.name}</Select.Option>
                                            }) : null}
                                        </Select>
                                    )}
                                </HelpComponent>
                            </Form.Item>
                        </Col>]
                    } form={this.props.form} addCaption={<FormattedMessage id="Label.Gateway" />} />
                    <DynamicFieldList fieldName='selectedhttps' initialItems={this.props.selectedVirtualService.https} itemComponents={(index, item: Http) =>
                        [<Col offset={1} span={12} key={1}>
                            <Form.Item>
                                <DynamicFieldList initialItems={item ? item.uris : null} fieldName={'uri' + index} itemComponents={(uriIndex, uri) =>
                                    [<Col key={1}>
                                        <Form.Item>
                                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Match' />}>
                                                {getFieldDecorator(`uriTypes[${index}][${uriIndex}]`, {
                                                    rules: [{ required: true, message: <FormattedMessage id='Message.TypeRequired' /> }],
                                                    initialValue: (uri ? Object.keys(uri)[0] : null)
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
                                                {getFieldDecorator(`uris[${index}][${uriIndex}]`, {
                                                    rules: [{ required: true, message: <FormattedMessage id='Message.InformationRequired' /> }],
                                                    initialValue: (uri ? uri[Object.keys(uri)[0]] : null)
                                                })(
                                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Information" />
                                                )}
                                            </HelpComponent>
                                        </Form.Item>
                                    </Col>]
                                } form={this.props.form} addCaption={<FormattedMessage id="Label.Uri" />} />
                                <DynamicFieldList initialItems={item ? item.headers : null} fieldName={'header' + index} itemComponents={(headerIndex, header) =>
                                    [<Col key={1}>
                                        <Form.Item>
                                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Header' />}>
                                                {getFieldDecorator(`headerNames[${index}][${headerIndex}]`, {
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
                                                {getFieldDecorator(`headerTypes[${index}][${headerIndex}]`, {
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
                                                {getFieldDecorator(`headers[${index}][${headerIndex}]`, {
                                                    rules: [{ required: true, message: <FormattedMessage id='Message.HeaderValueRequired' /> }],
                                                })(
                                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Header Value" />
                                                )}
                                            </HelpComponent>
                                        </Form.Item>
                                    </Col>]
                                } form={this.props.form} addCaption={<FormattedMessage id="Label.Header" />} />
                                <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Rewrite' />}>
                                    {getFieldDecorator(`rewrite[${index}]`, {
                                        rules: [{ required: false, message: <FormattedMessage id='Message.RewriteRequired' /> }],
                                        initialValue: (item ? (item.rewrite ? item.rewrite.uri : null) : null)
                                    })(
                                        <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Rewrite" />
                                    )}
                                </HelpComponent>
                                <DynamicFieldList initialItems={item ? item.routes : null} fieldName={'route' + index} itemComponents={(routeIndex, route) =>
                                    [<Col key={1}>
                                        <Form.Item>
                                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Service' />}>
                                                {getFieldDecorator(`routes[${index}][${routeIndex}]`, {
                                                    rules: [{ required: true, message: <FormattedMessage id='Message.RouteRequired' /> }],
                                                    initialValue: (route ? route['host'] : null)
                                                })(
                                                    <Select showSearch onChange={this.changeDeployment} placeholder={<FormattedMessage id='Label.Service' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                        {this.props.selectedVirtualService.allServices ? this.props.selectedVirtualService.allServices.map((item, index) => {
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
                                                {getFieldDecorator(`ports[${index}][${routeIndex}]`, {
                                                    rules: [{ required: false, message: <FormattedMessage id='Message.PortRequired' /> }],
                                                    initialValue: (route ? route['port'] : null)
                                                })(
                                                    <Input prefix={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Port" />
                                                )}
                                            </HelpComponent>
                                        </Form.Item>
                                    </Col>,
                                    <Col key={3}>
                                        <Form.Item>
                                            <HelpComponent isHelp={this.props.isHelp} helpContent={<FormattedMessage id='Help.Deployment' />}>
                                                {getFieldDecorator(`versions[${index}][${routeIndex}]`, {
                                                    rules: [{ required: false, message: <FormattedMessage id='Message.DeploymentRequired' /> }],
                                                    initialValue: (route ? route['subset'] : null)
                                                })(
                                                    <Select showSearch placeholder={<FormattedMessage id='Label.Deployment' />} optionFilterProp="children" suffixIcon={<BrandIcon style={{ color: 'rgba(0,0,0,.25)' }} />}>
                                                        {this.props.selectedVirtualService.serviceAllDeployments ? this.props.selectedVirtualService.serviceAllDeployments.map((item, index) => {
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
                                <Button type="primary" shape="circle" icon="save" htmlType="submit" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default connect()(Form.create({ name: 'virtualservice_drawer' })(VirtualServiceDrawer));
