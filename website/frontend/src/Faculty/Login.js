import React from "react";
import axios from "axios";
import { Form, Icon, Input, Button, Card } from "antd";
import Notify from "../OtherComponents/Notify";
const server = require("../OtherComponents/serverip");
const ALIGNCENTER = require("../OtherComponents/AlignCenter");

const FormItem = Form.Item;
const style = {
  paddingLeft: 50,
  paddingRight: 50
};

class Login extends React.Component {
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
        axios
          .post("http://" + server.ip + ":" + server.port + "/login", {
            username: values.userName,
            password: values.password
          })
          .then(result => {
            if(result.status!==200){
              Notify("warning","Network Error","There is a possible network error");
            }
            else
              return result.data;
          })
          .then(result => {
            if (result === "authorized") {
              localStorage.setItem("username", values.userName);
              localStorage.setItem("password", values.password);
              this.props.onLogin();
            }
            else{
              Notify("warning","Incorrect credentials","Your credentials are incorrect.");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    if (localStorage.getItem("loggedin") === "true") {
      var usernameValue = localStorage.getItem("username");
      var passwordValue = localStorage.getItem("password");
    }
    return (
      <Card style={ALIGNCENTER}>
        <h3>Login to your account.</h3>
        <Form onSubmit={this.handleSubmit} className="login-form" style={style}>
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ],
              initialValue: usernameValue
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
              initialValue: passwordValue
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
        {this.state.loading}
      </Card>
    );
  }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
