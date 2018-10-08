import React, { Component } from "react";
import WrappedFacultyChoices from "./FacultyChoices";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const alignLeft = {
  padding: 20,
  paddingTop:0,
  textAlign: "left"
};

export default class Faculty extends Component {
  render() {
    return (
      <Router>
        <div style={alignLeft}>
          <div className="ui menu">
            <Link to="/faculty/choices">
              <p className="item">Choices</p>
            </Link>
          </div>
          <hr />
          <Route path="/faculty/choices" component={WrappedFacultyChoices} />
        </div>
      </Router>
    );
  }
}
