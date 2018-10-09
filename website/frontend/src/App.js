import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import Faculty from "./Faculty";
import WrappedSignup from "./Faculty/Signup";
import WrappedCheckOTP from "./Faculty/CheckOTP";
import WrappedCreateAccount from "./Faculty/CreateAccount";
import YetToBeDeveloped from "./OtherComponents/YetToBeDeveloped";
const server = require("./OtherComponents/serverip");


class App extends Component {
  componentDidUnmount() {
    localStorage.setItem("notified", false);
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="ui menu">
              <Link to="/faculty">
                <p className="item">Faculty</p>
              </Link>
              <Link to="/general">
                <p className="item">General</p>
              </Link>
            </div>
            <Route exact path="/faculty" component={Faculty} />
            <Route exact path="/general" component={YetToBeDeveloped} />
            <Route exact path="/faculty/signup" component={WrappedSignup} />
            <Route
              exact
              path="/faculty/create-account"
              component={WrappedCreateAccount}
            />
            <Route
              exact
              path="/faculty/check-otp"
              component={WrappedCheckOTP}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
