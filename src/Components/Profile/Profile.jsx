import "./Profile.css";
import React from "react";

import Graph from "./Graph/Graph";
import FlippableCard from "./FlippableCard/FlippableCard";
import FlippableCard2 from "./FlippableCard/FlippableCard2";
import UserInfo from "./UserInfo/UserInfo";

export default function App() {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const data = [
    {
      monthName: month[d.getMonth() - 2],
      eventAttain: 2,
      events: 3,
    },
    {
      monthName: month[d.getMonth() - 1],
      eventAttain: 5,
      events: 5,
    },
    {
      monthName: month[d.getMonth()],
      eventAttain: 0,
      events: 2,
    },
  ];
  return (
    <div className="Profile">
      <div className="navs sub-profile"></div>
      <div className="user-profile sub-profile">
        <UserInfo />
      </div>

      <div className="Profile-cards sub-profile">
        <FlippableCard />
        <FlippableCard2 />
        <Graph data={data} />
      </div>
    </div>
  );
}
