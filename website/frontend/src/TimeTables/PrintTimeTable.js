import React from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Day",
    width: 120,
    dataIndex: "day",
    key: "name"
  },
  {
    title: "9:00-10:00",
    width: 120,
    dataIndex: "9",
    key: "9"
  },
  {
    title: "10:00-11:00",
    width: 120,
    dataIndex: "10",
    key: "10"
  },
  {
    title: "11:00-12:00",
    width: 120,
    dataIndex: "11",
    key: "11"
  },
  {
    title: "12:00-1:00",
    width: 120,
    dataIndex: "12",
    key: "12"
  },
  {
    title: "1:00-2:00",
    width: 120,
    dataIndex: "1",
    key: "1"
  },
  {
    title: "2:00-3:00",
    width: 120,
    dataIndex: "2",
    key: "2"
  },
  {
    title: "3:00-4:00",
    width: 120,
    dataIndex: "3",
    key: "3"
  },
  {
    title: "4:00-5:00",
    width: 120,
    dataIndex: "4",
    key: "4"
  }
];

const data = [
  {
    key: "1",
    day: "Monday",
    9: "OE",
    10: "DE",
    11: "SE",
    12: "DAA"
  },
  {
    key: "2",
    day: "Tuesday",
    9: "OE",
    10: "DE",
    1: "SE Lab G2",
    2: "SE Lab G2",
    3: "ACD",
    4: "DAA"
  },
  {
    key: "3",
    day: "Wednesday",
    9: "OE",
    10: "DE",
    11: "D Com",
    12: "DAA"
  },
  {
    key: "3",
    day: "Thursday",
    9: "OE",
    11: "DAA Lab G1\nACD Lab G2",
    12: "DAA Lab G1\nACD Lab G2",
    2: "SE",
    3: "D Com",
    4: "ACD"
  },
  {
    key: "3",
    day: "Friday",
    9: "OE",
    10: "SE",
    11: "D Com",
    12: "ACD",
    3: "DAA Lab G2\nSE Lab G1",
    4: "DAA Lab G2\nSE Lab G1"
  },
  {
    key: "3",
    day: "Saturday",
    9: "OE",
    1: "DAA",
    2: "SE",
    3: "D Com",
    4: "ACD"
  }
];

export default class PrintTimeTable extends React.Component {
  render() {
    return (
      <div style={{ border: "solid black 2px" }}>
        This component will print the required time table resulting from the
        Search Time Table Component.
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: "fit-content" }}
          bordered
        />
      </div>
    );
  }
}
