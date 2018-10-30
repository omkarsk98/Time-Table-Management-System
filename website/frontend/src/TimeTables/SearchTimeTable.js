import React from "react";
import {
  Form,
  Select,
} from "antd";
import { FORMFIELDPADDING } from '../OtherComponents/constants';
const FormItem = Form.Item;
const Option = Select.Option;

class SearchTimeTable extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: "Please wait while it is loading." });
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form || "";
    return (
      <div style={{border:'solid black 2px'}}>
        This component will have a form with input as semester and section
        <br /> and will return the required time table.
        <br />
        <Form style={FORMFIELDPADDING}>
          <FormItem label="Semester" {...formItemLayout}>
            {getFieldDecorator("semester", {
              rules: [{ required: true, message: "Please select a semester." }]
            })(
              <Select placeholder="Please select a semester.">
                <Option value="5">Semester 5</Option>
                <Option value="3">Semester 3</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="Section" {...formItemLayout}>
            {getFieldDecorator("section", {
              rules: [{ required: true, message: "Please select a section." }]
            })(
              <Select placeholder="Please select a section.">
                <Option value="5">Section A</Option>
                <Option value="3">Section B</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedSearchTimeTable = Form.create()(SearchTimeTable);
export default WrappedSearchTimeTable;