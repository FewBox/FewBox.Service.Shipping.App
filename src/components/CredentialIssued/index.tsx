import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, Row, Col, Select } from 'antd';
import { CaptainIcon, ShippingLineIcon } from '../Icon';
import { ShippingLine, StampComponent } from '../../reducers/State';
import TextArea from 'antd/lib/input/TextArea';
import { autobind } from 'core-decorators';

export interface ICaptainTrainingProps {
    shippingLines: ShippingLine[];
    stampComponents: StampComponent[];
    issue: (string) => void;
    reload: () => void;
    addStampComponent: (number) => void;
    removeStampComponent: (number) => void;
    form: any;
}

class CaptainTraining extends React.PureComponent<ICaptainTrainingProps> {
    @autobind
    addStamp() {
        this.props.addStampComponent(this.props.stampComponents.length + 1);
    }
    @autobind
    removeStamp(index) {
        this.props.removeStampComponent(index);
    }
    @autobind
    getRemoveComponent(index, lastIndex) {
        if (index == lastIndex) {
            return <Button icon="minus" onClick={() => { this.removeStamp(index); }} />;
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let stampsJson = '';
                Object.keys(values).filter((k) => { return k.startsWith('stamp-key'); }).map((k, index) => {
                    let elementIndex = k.substr('stamp-key'.length);
                    stampsJson += _.template('"<%= key %>":"<%= content %>",')({ key: values[k], content: btoa(values['stamp-content' + elementIndex]) });
                });
                stampsJson = _.template('{<%= children %>}')({ children: _.trimEnd(stampsJson, ',') });
                console.log(stampsJson);
                let stamps;
                if (stampsJson !== '') {
                    stamps = JSON.parse(stampsJson);
                }
                this.props.issue({ shippingLine: values.shippingLine, name: values.name.toLowerCase(), stamps: stamps });
            }
        });
    };
    public render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        var stampComponents = this.props.stampComponents.map((item, index) => {
            return <Row gutter={16} key={item.name + index}>
                <Col span={6}>
                    <Form.Item>
                        {getFieldDecorator('stamp-key' + index, {
                            rules: [{ required: true, message: 'Please input key!' }],
                        })(
                            <Input prefix={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Key" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('stamp-content' + index, {
                            rules: [{ required: true, message: 'Please input content!' }],
                        })(
                            <TextArea rows={4} placeholder="Content" />
                        )}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item>
                        {this.getRemoveComponent(index, this.props.stampComponents.length - 1)}
                    </Form.Item>
                </Col>
            </Row>
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('shippingLine', {
                                rules: [{ required: true, message: 'Please input Shipping Line!' }],
                            })(
                                <Select suffixIcon={<ShippingLineIcon style={{ color: 'rgba(0,0,0,.25)' }} />} showSearch placeholder="Shipping Line" optionFilterProp="children">
                                    {this.props.shippingLines.map((item, index) => {
                                        return <Select.Option key={'shippingline' + index} value={item.name}>{item.name}</Select.Option>
                                    })}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input name!' }],
                            })(
                                <Input prefix={<CaptainIcon style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                {stampComponents}
                <Row gutter={16}>
                    <Col span={24}>
                        <Button icon="plus" onClick={this.addStamp} />
                    </Col>
                </Row>
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

export default connect()(Form.create({ name: 'captain_training' })(CaptainTraining));