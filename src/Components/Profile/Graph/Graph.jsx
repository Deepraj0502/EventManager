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
        width={296}
        height={250}
        cursor={"pointer"}
        data={data}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="monthName"
          label={{
            position: "insideBottom",
            textAnchor: "middle",
            offset: -5,
          }}
        />
        <YAxis
          dataKey="events"
          label={{
            value: "Event Attained",
            textAnchor: "middle",
            angle: -90,
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
