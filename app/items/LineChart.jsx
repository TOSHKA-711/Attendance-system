"use client";

import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default class DashLineChart extends PureComponent {
  // state = {
  //   data: [],
  //   error: null,
  // };

  // componentDidMount() {
  //   this.fetchData();
  // }

  // fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       // `/api/public/dashboard/getRevenue`
  //       `https://app.yallapadel.club/public/dashboard/getRevenue`
  //       );
  //     const { total_revenue, total_pending, total_complete, total_cancel } = response.data;

  //     // Transform data for the chart
  //     const data = [
  //       { name: "Revenue", value: total_revenue },
  //       { name: "Pending", value: total_pending },
  //       { name: "Complete", value: total_complete },
  //       { name: "Cancelled", value: total_cancel },
  //     ];

  //     this.setState({ data });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     this.setState({ error: "Failed to load data." });
  //   }
  // };

  // render() {
  //   const { data, error } = this.state;
  state = {
    data: [
      { name: "00:00", value: 80 }, 
      { name: "01:00", value: 100 }, 
      { name: "02:00", value: 40 },
      { name: "03:00", value: 50 }, 
      { name: "04:00", value: 60 }, 
      { name: "05:00", value: 30 }, 
      { name: "06:00", value: 0 }, 
    ],
    error: null,
  };

  render() {
    const { data, error } = this.state;
    return (
      <div style={{ width: "100%", height: "300px" , backgroundColor:"#F5F5F5"}}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 10,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                borderRadius: "10px",
                border: "1px solid #fff",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#27CDA5"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
