import "./Profile.css";
import React from "react";
import NavbarComp from "../NavbarComp";
import Graph from "./Graph/Graph";
import FlippableCard from "./FlippableCard/FlippableCard";
import FlippableCard2 from "./FlippableCard/FlippableCard2";
import { FaUserCircle } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";

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
    <>
      <NavbarComp active="2" />
      <div className="profile-outer-div">
        <div className="profile-info-div">
          <FaUserCircle className="profile-image" />
          <div className="profile-inner-info">
            <p className="profile-name">Deepraj Pagare</p>
            <div style={{ display: "flex" }}>
              <HiMail
                style={{ width: "30px", height: "30px", color: "#6671ff" }}
              />
              <p className="profile-details">pagaredeepraj05@gmail.com</p>
            </div>
            <div style={{ display: "flex" }}>
              <BsTelephoneFill
                style={{ width: "30px", height: "24px", color: "#6671ff" }}
              />
              <p className="profile-details">8879869667</p>
            </div>
          </div>
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/21207-removebg-preview.png?updatedAt=1684923957895"
            alt=""
            className="profile-vector"
          />
        </div>
        <div className="profile-card-div">
          <FlippableCard />
          <FlippableCard2 />
          <Graph data={data} />
        </div>
      </div>
    </>
  );
}
