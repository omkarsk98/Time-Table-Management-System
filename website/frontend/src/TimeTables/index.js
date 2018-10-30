import React from "react";
import WrappedSearchTimeTable from "./SearchTimeTable";
import PrintTimeTable from "./PrintTimeTable";
import { FORMFIELDPADDING } from '../OtherComponents/constants';

export default class TimeTables extends React.Component {
  render() {
    return (
      <div style={FORMFIELDPADDING}>
        Time Tables to be viewed here.
        <br />
        This component is under development.
        {/* 
        1. Form to search for semester and section.
        2. A static timetable for now.
        */}
        <br />
        <br />
        <WrappedSearchTimeTable />
        <br />
        <PrintTimeTable />
      </div>
    );
  }
}
