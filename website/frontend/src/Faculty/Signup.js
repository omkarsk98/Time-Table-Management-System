import React from "react";
import { Form, Icon, Input, Button, Card } from "antd";

const FormItem = Form.Item;
const style = {
  paddingLeft: 50,
  paddingRight: 50
};

class Signup extends React.Component {
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
      if (!err) {
        this.props.onSignup(values.email);
      }
    });
  };
  goToLogin = () =>{
    this.props.changeState("login")
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card>
        <p>
          We will send an otp do the emailid you enter.
          <br />
          If the otp is valid, you can set your username and password.
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form" style={style}>
          <FormItem label="Your Email id">
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email id!" }
              ]
            })(
              <Input
                type="email"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="emailid"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Get OTP
            </Button>
          </FormItem>
          {this.state.loading}
          <br/>
          <p>Already have an account? Login directly.</p>
          <FormItem>
            <Button
              type="primary"
              className="login-form-button"
              onClick={this.goToLogin}
            >
              Login Directly
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const WrappedSignup = Form.create()(Signup);
export default WrappedSignup;
