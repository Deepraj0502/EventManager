import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./Graph.css";

export default function Graph({ data }) {
  return (
    <div className="Graph">
      <LineChart
        width={310}
        height={300}
        cursor={"pointer"}
        data={data}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="monthName"
          label={{
            value: "Month",
            position: "insideBottom",
            textAnchor: "middle",
            offset: -5,
          }}
        />
        <YAxis
          dataKey="events"
          label={{
            value: "Event Attain",
            position: "insideLeft",
            angle: -90,
            offset: 20,
          }}
        />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="eventAttain"
          stroke="#8884d8"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
}
