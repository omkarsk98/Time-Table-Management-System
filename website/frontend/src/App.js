import React, { Component } from "react";
import "./App.css";
import Faculty from "./Faculty";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
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
            <Route exact path="/general" component={Faculty} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
