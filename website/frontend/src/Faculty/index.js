import React, { Component } from "react";
import axios from "axios";
import WrappedFacultyChoices from "./FacultyChoices";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WrappedLogin from "./Login";
import WrappedSignup from "./Signup";
import WrappedCreateAccount from "./CreateAccount";
import WrappedCheckOTP from "./CheckOTP";
import Notify from "../OtherComponents/Notify";
const server = require("../OtherComponents/serverip");

const alignLeft = {
  padding: 20,
  paddingTop: 0,
  textAlign: "left"
};

export default class Faculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      status: "signup"
    };
    if (!localStorage.getItem("status"))
      localStorage.setItem("status", "login");
  }
  onLogin = () => {
    this.setState({
      loggedin: true,
      status:"registered"
    });
    localStorage.setItem("status", "registered");
    localStorage.setItem("loggedin", true);
    localStorage.setItem("notified", false);
    if (localStorage.getItem("notified") === "false") {
      Notify("success", "Logged in", "You are logged in!");
      localStorage.setItem("notified", true);
    }
  };
  onsignupemail = email => {
    // send mail
    localStorage.setItem("mail",email)
    axios
      .post("http://" + '13.58.158.49' + ":" + '80' + "/signup", {
        email: email
      })
      .then(result => {
        if (result.status !== 200) {
          Notify(
            "warning",
            "Network Error",
            "There is a possible network error"
          );
        } else if (result.data === "email required")
          Notify(
            "warning",
            "Email Id required",
            "This is a server side validation. Please add you email id."
          );
        else return result.data;
      })
      .then(result => {
        console.log("Result as", result);
        this.setState({
          status: "otp"
        });
        localStorage.setItem("status", "otp");
        localStorage.setItem("OTP", result.otp);
      })
      .catch(err => {
        console.log(err);
      });
    // 1. create api end point for sending otp
    // 2. change state and render component for verifying otp
  };
  changeState = state =>{
    this.setState({
      status:state
    });
    localStorage.setItem("status",state)
  }
  verifyOTP = otp => {
    if (otp === localStorage.getItem("OTP")) {
      Notify("success", "OTP verified", "Your otp is verified!");
      this.setState({
        status: "account"
      });
      localStorage.setItem("status", "account");
    }
  };
  createAccount = data => {
    // console.log("request to create an account.");
    axios
      .post("http://" + server.ip + ":" + server.port + "/create-account", {
        mail: localStorage.getItem("mail"),
        username: data.username,
        password: data.password
      })
      .then(result => {
        if (result.status !== 200) {
          Notify(
            "warning",
            "Network Error",
            "There is a possible network error"
          );
        } else if (result.data === "data required")
          Notify("warning", "Data Missing", "Some input field is missing.");
        else return result.data;
      })
      .then(result => {
        this.setState({
          status: "login"
        });
        localStorage.setItem("status", "login");
        localStorage.setItem("username", data.username);
        localStorage.setItem("password", data.password);
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount() {
    if (localStorage.getItem("loggedin") === "true") {
      this.setState({
        loggedin: true
      });
    }
  }

  render() {
    console.log(this.state.status);
    return (
      <div>
        {(() => {
          if (this.state.status === "signup") {
            return (
              <div>
                <WrappedSignup changeState={this.changeState} onSignup={this.onsignupemail} />
              </div>
            );
          } else if (
            this.state.status === "otp" ||
            localStorage.getItem("status") === "otp"
          )
            return (
              <div>
                <WrappedCheckOTP onOTP={this.verifyOTP} />
              </div>
            );
          else if (
            this.state.status === "account" ||
            localStorage.getItem("status") === "account"
          ) {
            return (
              <div>
                <WrappedCreateAccount onCreateAccount={this.createAccount} />
              </div>
            );
          } else if (
            this.state.status === "login" ||
            localStorage.getItem("status") === "login"
          ) {
            return(
              <div>
                <WrappedLogin onLogin={this.onLogin}/>
              </div>
          );
        }
          else if(this.state.status==="registered"||localStorage.getItem("status")==="registered"){
            return (
              <Router>
                <div style={alignLeft}>
                  <div className="ui menu">
                    <Link to="/faculty/choices">
                      <p className="item">Choices</p>
                    </Link>
                  </div>
                  <hr />
                  <Route
                    path="/faculty/choices"
                    component={WrappedFacultyChoices}
                  />
                  <Route
                    exact
                    path="/faculty/signup"
                    component={WrappedSignup}
                  />
                  <Route
                    exact
                    path="/faculty/check-otp"
                    component={WrappedCheckOTP}
                  />
                </div>
              </Router>
            );
          }
        })()}
      </div>
    );
  }
}
