import React from "react";
import { Form, Input, Button, Card } from "antd";
const ALIGNCENTER = require("../OtherComponents/AlignCenter");

const FormItem = Form.Item;
const style = {
  paddingLeft: 50,
  paddingRight: 50
};

class CheckOTP extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOTP(values.otp);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={ALIGNCENTER}>
        <h3>Enter your OTP to verify your account.</h3>
        <Form onSubmit={this.handleSubmit} className="login-form" style={style}>
          <FormItem label="Enter OTP">
            {getFieldDecorator("otp", {
              rules: [
                { required: true, message: "Please input the otp sent to you email id.!" }
              ]
            })(
              <Input
                type="tel"
                placeholder="otp"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Verify
            </Button>
            {/* Or <a href="">register now!</a> */}
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const WrappedCheckOTP = Form.create()(CheckOTP);
export default WrappedCheckOTP;
