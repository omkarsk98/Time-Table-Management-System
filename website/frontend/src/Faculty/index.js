import React, { Component } from "react";
import WrappedFacultyChoices from "./FacultyChoices";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import WrappedLogin from "./Login";


const alignLeft = {
  padding: 20,
  paddingTop: 0,
  textAlign: "left"
};

export default class Faculty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    };
  }
  onLogin = () => {
    this.setState({
      loggedin: true
    });
    localStorage.setItem("loggedin",true)
  };
  componentDidMount() {
    if (localStorage.getItem("loggedin") === "true") {
      this.setState({
        loggedin: true
      });
    }
    
  }

  render() {
    return (
      <div>
        {(() => {
          if (!this.state.loggedin) {
            return (
              <div>
                <WrappedLogin onLogin={this.onLogin} />
              </div>
            );
          } else {
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
                </div>
              </Router>
            );
          }
        })()}
      </div>
    );
  }
}
