import * as React from 'react';
import * as _ from 'lodash';
import { Row, List, Col, Button, Form, Input, Card, Icon } from 'antd';

export interface IDynamicFieldListProps {
  fieldName: string;
  initialItems?: any[];
  itemComponents: (index, item) => React.ReactNode[];
  form: any;
  addCaption: string | React.ReactNode;
}

let id = 0;

export default class DynamicFieldList extends React.PureComponent<IDynamicFieldListProps> {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue(this.props.fieldName);
    // can use data-binding to set
    let fieldValue = JSON.parse(_.template('{"<%= keys %>":<%= values %>}')({ keys: this.props.fieldName, values: JSON.stringify(keys.filter(key => key !== k)) }));
    form.setFieldsValue(fieldValue);
  };
  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue(this.props.fieldName);
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    let fieldValue = JSON.parse(_.template('{"<%= keys %>":<%= values %>}')({ keys: this.props.fieldName, values: JSON.stringify(nextKeys) }));
    form.setFieldsValue(fieldValue);
  };
  init = (items: any[]) => {
    items.map((item, index) => {
      this.add();
    });
  };
  clear = () => {
    id = 0;
    const { form } = this.props;
    let fieldValue = JSON.parse(_.template('{"<%= keys %>":<%= values %>}')({ keys: this.props.fieldName, values: JSON.stringify([]) }));
    form.setFieldsValue(fieldValue);
  };
  public render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    // keys state to store dynamic key.
    getFieldDecorator(this.props.fieldName, { initialValue: [] });
    const keys = getFieldValue(this.props.fieldName);
    if (this.props.initialItems && this.props.initialItems.length > 0 && keys.length == 0) {
      this.init(this.props.initialItems);
    }
    if (this.props.initialItems && this.props.initialItems.length == 0 && keys.length != 0) {
      this.clear();
    }
    const fromItems = keys.map((k, index) => {
      let item;
      if (this.props.initialItems && index <= this.props.initialItems.length) {
        item = this.props.initialItems[index];
      }
      return <Row gutter={16} key={'item' + index}>
        <Card>
          <Row type="flex" justify="end"><Icon type="close" style={{ fontSize: '16px', color: '#E8E8E8' }} onClick={() => { this.remove(k); }} /></Row>
          {this.props.itemComponents(index, item)}
        </Card>
      </Row>
    });
    return (
      <Row>
        {fromItems}
        <Row>
          <Col span={3}>
            <Button icon="plus" type="link" onClick={this.add}>{this.props.addCaption}</Button>
          </Col>
        </Row>
      </Row>
    );
  }
}