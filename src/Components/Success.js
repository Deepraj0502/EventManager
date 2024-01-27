import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComp from "./NavbarComp";

export default function Success() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToHome = () => {
    navigate("/home", {
      state: {
        email: location.state.email,
      },
    });
  };
  const navigateToViewSampleTicket = () => {
    navigate("/sampleticket", {
      state: {
        email: location.state.email,
        eventname: location.state.eventname,
        ticket: location.state.ticket,
        eventaddress: location.state.eventaddress,
      },
    });
  };
  return (
    <div>
      {loading && (
        <div className="loading-background">
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/loading.gif?updatedAt=1685464907954"
            alt=""
            style={{ position: "absolute", zIndex: "99" }}
            className="global-loading-gif"
          />
        </div>
      )}
      <NavbarComp active="7" />
      <div
        className="home-inner"
        style={{
          padding: "50px",
          display: "flex",
          overflowY: "scroll",
          background: "white",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="https://img.freepik.com/free-vector/appointment-booking-smartphone_23-2148559902.jpg?w=740&t=st=1689597352~exp=1689597952~hmac=35d5a884377d04c124d8b29e6ab13ac63139beeedd1cbaf6375e717b01c1f83a"
          alt=""
          className="add-event-image"
        />
        <p className="add-event-text">Event Has Been Added Successfully</p>
        <div className="add-event-browse-div">
          <button
            type="button"
            className="add-event-browse"
            onClick={navigateToHome}
          >
            Browse Events
          </button>
          <button
            type="button"
            className="add-event-your"
            onClick={navigateToViewSampleTicket}
          >
            View Sample Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
