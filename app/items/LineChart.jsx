"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashLineChart = ({ hourlyData = {} }) => {
  // نحول الـ object بتاع الساعات لمصفوفة مناسبة للـ chart
  const formattedData = Object.entries(hourlyData).map(([time, value]) => ({
    name: time,
    value,
  }));

  console.log("gdata",formattedData);

  return (
    <div
      style={{ width: "100%", height: "300px", backgroundColor: "#F5F5F5" }}
    >
      <ResponsiveContainer>
        <LineChart
          data={formattedData}
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
};

export default DashLineChart;
