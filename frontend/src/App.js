import React, { Component } from "react";
import "./App.css";
import FacultyChoices from "./Faculty/FacultyChoices";
import { Switch, Route, BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar>
          <Grid>
            <Grid.Column width={16}> */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/faculty/choices" component={FacultyChoices} />
            {/* <Route component={Dashboard} /> */}
          </Switch>
        </BrowserRouter>
        {/* </Grid.Column>
          </Grid>
        </Navbar> */}
      </div>
    );
  }
}

export default App;
