import React, { Component } from "react";
import WrappedFacultyChoices from "./FacultyChoices";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;

const alignLeft = {
  padding: 20,
  textAlign: "left"
};

export default class Faculty extends Component {
  render() {
    return (
      <div className="Faculty" style={alignLeft}>
        <BrowserRouter>
          <Switch>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Subject Choices" key="1">
                <Route
                  exact
                  path="/faculty/choices"
                  component={WrappedFacultyChoices}
                />
              </TabPane>
              <TabPane tab="Something1" key="2">
                Content of Something 1
              </TabPane>
              <TabPane tab="General" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
