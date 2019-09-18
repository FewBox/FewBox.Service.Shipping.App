import * as React from 'react';
import * as _ from 'lodash';
import { Row, List, Col, Button, Form, Input } from 'antd';

export interface IDynamicFieldListProps {
  fieldName: string;
  initialItems?: any[];
  itemComponents: (k, i) => React.ReactElement[];
  form: any;
  addCaption: string | React.ReactElement;
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
      if (this.props.initialItems && k <= this.props.initialItems.length) {
        item = this.props.initialItems[k];
      }
      return <Row gutter={16} key={'item' + index}>
        {this.props.itemComponents(index, item)}
        <Col span={1}><Button type="link" icon="minus" onClick={() => { this.remove(k); }} /></Col>
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