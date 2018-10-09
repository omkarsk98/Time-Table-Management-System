import React from "react";
import { Form, Icon, Input, Button, Checkbox, Card } from "antd";
import Notify from "../OtherComponents/Notify";

const FormItem = Form.Item;
const style = {
  paddingLeft: 50,
  paddingRight: 50
};


class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.userName==="omkarsk" && values.password==="hey"){
          console.log("Loggedin");
          localStorage.setItem("username",values.userName);
          localStorage.setItem("password",values.password);
          this.props.onLogin()
        }
        else{
          console.log("Incorrect");
          Notify("warning","Incorrect credentials","Your credentials are incorrect.");
        }
        // console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (localStorage.getItem("loggedin") === "true") {
      var usernameValue = localStorage.getItem("username");
      var passwordValue = localStorage.getItem('password');
    }
    return (
      <Card>
        <Form onSubmit={this.handleSubmit} className="login-form" style={style}>
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ],
              initialValue: usernameValue,
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ],
              initialValue: passwordValue,
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
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })}
            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            {/* Or <a href="">register now!</a> */}
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
