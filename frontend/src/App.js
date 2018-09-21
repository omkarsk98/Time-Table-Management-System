import React, { Component } from "react";
import "./App.css";
import Faculty from "./Faculty";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Faculty" key="1">
                <Route path="/faculty" component={Faculty} />
              </TabPane>
              <TabPane tab="Student" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="General" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
            
            {/* <Route component={Dashboard} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
