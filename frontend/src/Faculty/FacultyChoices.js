import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";

const FormItem = Form.Item;

export default class FacultyChoices extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        Hello!
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Row gutter={24}>
            <Col className="gutter-row" xs={24}>
              <FormItem label="Mobile Number:">
                {getFieldDecorator("contact.mobile", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your mobile number!"
                    }
                  ],
                  initialValue: ""
                })(
                  <Input
                    disabled={false}
                    type="tel"
                    placeholder="Mobile Number"
                  />
                )}
              </FormItem>
            </Col>
            <Col className="gutter-row" xs={24}>
              <FormItem label="Alternet Mobile Number:">
                {getFieldDecorator("contact.altMobile", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your alternet mobile number!"
                    }
                  ],
                  initialValue: "contact.altMobile"
                })(
                  <Input
                    disabled={false}
                    type="tel"
                    placeholder="Mobile Number"
                  />
                )}
              </FormItem>
            </Col>
            <Col className="gutter-row" xs={24}>
              <FormItem label="Email ID:">
                {getFieldDecorator("contact.email", {
                  rules: [
                    { required: true, message: "Please input your Email!" }
                  ],
                  initialValue: ""
                })(
                  <Input
                    disabled={false}
                    type="email"
                    placeholder="Email"
                  />
                )}
              </FormItem>
            </Col>
            <Col className="gutter-row" xs={24}>
              <FormItem label="Facebook ID:">
                {getFieldDecorator("contact.facebookId", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your Facebook ID!"
                    }
                  ],
                  initialValue: ""
                })(
                  <Input
                    disabled={false}
                    type="text"
                    placeholder="Facebook ID"
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
