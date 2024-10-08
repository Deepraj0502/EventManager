import React from "react";
import "./Card.css";
import { MdEmojiEvents } from "react-icons/md";

export default function Card() {
  return (
    // <div className="card">
    <div className="card-front">
      <div className="card-event">
        <p style={{ margin: "0" }}>Events Attainted</p>
      </div>

      <div className="card-event-number">
        <p style={{ margin: "0" }}>18</p>
      </div>
      <div className="card-event-icon">
        <MdEmojiEvents
          style={{ width: "60px", height: "60px" }}
          className="card-event-icon-md"
        />
      </div>
    </div>
    // </div>
  );
}
