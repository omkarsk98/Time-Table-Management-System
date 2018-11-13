import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Form, Input, Button, DatePicker } from "antd";
import Notify from "../OtherComponents/Notify";
const server = require("../OtherComponents/serverip");

const FormItem = Form.Item;
const formDesign = {
  padding: 20,
  textAlign: "left"
};

const adjustMargin = {
  marginBottom: 0
};

const choices = {
  padding: 10
};

const datepicker = {
  width: "100%"
};

class FacultyChoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: "Please wait while it is loading." });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        axios
          .post("http://" + server.ip + ":" + server.port + "/add-choices", {
            mail: localStorage.getItem("mail"),
            id: values.employeeId,
            doj: values.doj,
            choice1: values.choice1,
            choice2: values.choice2,
            choice3: values.choice3,
            choice4: values.choice4
          })
          .then(result => {
            if (result.status === 422 && result.data === 'data required') {
              Notify(
                "warning",
                "Data Missing",
                "All fields are mandatory"
              );
            } else if (result.data === "email id required")
              Notify(
                "warning",
                "Email Id required",
                "Please re-register with your official email id."
              );
            else return result.data;
          })
          .then(result => {
            console.log("Result as", result);
            // localStorage.setItem("status", "otp");
            // localStorage.setItem("OTP", result.otp);
          })
          .catch(err => {
            console.log(err);
          });
        // console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <b>Please enter the choices for your subjects.</b>
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
          style={formDesign}
        >
          <FormItem label="Employee Id:" style={adjustMargin}>
            {getFieldDecorator("employeeId", {
              rules: [
                { required: true, message: "Please input your employee id!" }
              ]
            })(<Input placeholder="Employee id" type="text" />)}
          </FormItem>
          <FormItem label="Date of Joining" style={adjustMargin}>
            {getFieldDecorator("doj", {
              rules: [
                {
                  required: true,
                  message: "Please input your date of joining!"
                }
              ]
            })(<DatePicker style={datepicker} />)}
          </FormItem>
          Add your choices in terms of Course Codes.
          <div style={choices}>
            <FormItem label="Choice 1" style={adjustMargin}>
              {getFieldDecorator("choice1", {
                rules: [
                  { required: true, message: "Please input your choice!" }
                ]
              })(<Input placeholder="choice 1" type="text" />)}
            </FormItem>
            <FormItem label="Choice 2" style={adjustMargin}>
              {getFieldDecorator("choice2", {
                rules: [
                  { required: true, message: "Please input your choice!" }
                ]
              })(<Input placeholder="choice 2" type="text" />)}
            </FormItem>
            <FormItem label="Choice 3" style={adjustMargin}>
              {getFieldDecorator("choice3", {
                rules: [
                  { required: true, message: "Please input your choice!" }
                ]
              })(<Input placeholder="choice 3" type="text" />)}
            </FormItem>
            <FormItem label="Choice 4" style={adjustMargin}>
              {getFieldDecorator("choice4", {
                rules: [
                  { required: true, message: "Please input your choice!" }
                ]
              })(<Input placeholder="choice 4" type="text" />)}
            </FormItem>

            <FormItem style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </FormItem>
          </div>
        </Form>
        {this.state.loading}
      </div>
    );
  }
}

const WrappedFacultyChoices = Form.create()(FacultyChoices);
export default WrappedFacultyChoices;
