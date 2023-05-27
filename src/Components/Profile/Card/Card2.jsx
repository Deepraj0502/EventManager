import React from "react";
import "./Card.css";
import { BsCalendarEventFill } from "react-icons/bs";

export default function Card() {
  return (
    <div className="card">
      <div className="card-front">
        <div className="card-event">
          <p style={{ margin: "0" }}>Future Events</p>
        </div>
        <div className="card-event-icon">
          <BsCalendarEventFill style={{ width: "52px", height: "52px" }} />
        </div>
        <div className="card-event-number">
          <p style={{ margin: "0" }}>8</p>
        </div>
      </div>
    </div>
  );
}
