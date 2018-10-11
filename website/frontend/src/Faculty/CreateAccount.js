import React from "react";
import { Form, Icon, Input, Button, Card } from "antd";
const ALIGNCENTER = require("../OtherComponents/AlignCenter");

const FormItem = Form.Item;
const style = {
  paddingLeft: 50,
  paddingRight: 50
};

class CreateAccount extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading:""
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading:"Please wait while it is loading."});
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.onCreateAccount(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={ALIGNCENTER}>
        <h3>Create Acoount.</h3>
        <Form onSubmit={this.handleSubmit} className="login-form" style={style}>
          <FormItem label="Set username">
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="username"
              />
            )}
          </FormItem>
          <FormItem label="Set password">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Create
            </Button>
          </FormItem>
        </Form>
        {this.state.loading}
      </Card>
    );
  }
}

const WrappedCreateAccount = Form.create()(CreateAccount);
export default WrappedCreateAccount;
