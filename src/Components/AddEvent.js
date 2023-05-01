import React,{useState} from "react";
import "./login.css";

export default function AddEvent() {
  const putUserData = () => {
    var name = document.getElementById("eventname").value;
    var date = document.getElementById("date").value;
    var loc = document.getElementById("loc").value;
    var time = document.getElementById("time").value;
    var image = document.getElementById("image").value;
    fetch("http://127.0.0.1:8000/addevent", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        date: date,
        loc: loc,
        image: image,
        time:time
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["event"] == "success") {
          window.location.href = "/yourevents";
        } else {
          alert("Event Not Created");
        }
      });
  };
  return (
    <div className="outer-body">
      <div className="container">
        <div className="form-box" style={{ textAlign: "center" }}>
          <div className="header-form">
            <h4 className="text-primary text-center">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "110px" }}
              ></i>
            </h4>
            <h1>Event Details</h1>
          </div>
          <div className="body-form">
            <form onSubmit={putUserData} name="LoginForm">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Name"
                  id="eventname"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  id="date"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  id="loc"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="time"
                  className="form-control"
                  placeholder="Time"
                  id="time"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  id="image"
                  required
                />
              </div>
              <button
                type="submit"
                className="log-button btn btn-secondary btn-block"
              >
                Add Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
