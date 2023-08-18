import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation } from "react-router-dom";
import ticket1 from "../Images/ticket1.png";
import ticket2 from "../Images/ticket2.png";
import ticket3 from "../Images/ticket3.png";
import "./SampleTicket.css";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

export default function SampleTicket() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
});
  const location = useLocation();
  const onCapture = (tickettype) => {
    htmlToImage
      .toPng(document.getElementById(tickettype))
      .then(function (dataUrl) {
        saveAs(dataUrl, "Money Expo India 2023.png");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
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
          flexDirection: "column",
        }}
      >
        <h3 className="sample-head">Sample Ticket</h3>
        {location.state.ticket === "ticket1" && (
          <>
          <div id="ticket">
            <img src={ticket1} alt="" className="sample-ticket-image" />
            <div className="ticket-outer">
              <div className="ticket-left-div">
                <img
                  src="https://trasol.in/wp-content/uploads/2021/12/trasol-logo-2.png"
                  alt=""
                  className="ticket-organizer-logo"
                />
                <img
                  src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=Sample%20Ticket&choe=UTF-8"
                  alt=""
                  className="sample-ticket-qr"
                />
              </div>
              <div className="ticket-right-div">
                <img
                  src="https://ik.imagekit.io/ok2wgebfs/evento/Untitled__2_-removebg-preview.png?updatedAt=1689439802235"
                  alt=""
                  className="ticket-evento-logo"
                />
                <p className="ticket-event-name">Money Expo India 2023</p>
                <div className="ticket-data-div">
                  <h5 className="ticketData">Name:</h5>
                  <h5 className="ticketData">Mail ID:</h5>
                </div>
                <p className="ticket-address">
                  NESCO NESCO Center Western Express Highway Goregaon (East),
                  Mumbai 400063 Mumbai, MH 400063
                </p>
              </div>
            </div>
          </div>
          <button
          type="button"
          className="ticket-download-button"
          onClick={()=>onCapture('ticket')}
        >
          Download Ticket
        </button>
        </>
        )}
        {location.state.ticket === "ticket2" && (
          <>
          <div id="ticket-2">
            <img src={ticket2} alt="" className="sample-ticket-2-image" />
            <div className="ticket-2-outer">
              <div className="ticket-2-left-div">
                <img
                  src="https://ik.imagekit.io/ok2wgebfs/evento/Untitled__2_-removebg-preview.png?updatedAt=1689439802235"
                  alt=""
                  className="ticket-2-evento-logo"
                />
                <p className="ticket-2-event-name">Money Expo India 2023</p>
                <div className="ticket-2-data-div">
                  <h5 className="ticket-2Data">Name:</h5>
                  <h5 className="ticket-2Data">Mail ID:</h5>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  <p className="ticket-2-address">
                    NESCO NESCO Center Western Express Highway Goregaon (East),
                    Mumbai 400063 Mumbai, MH 400063
                  </p>
                  <p className="ticket-2-date">August 12, 2023</p>
                  <p className="ticket-2-time">12 PM</p>
                </div>
              </div>
              <div className="ticket-2-right-div">
                <img src="https://firebasestorage.googleapis.com/v0/b/evento-386813.appspot.com/o/Untitled%20(1).jpeg?alt=media&token=55a1dfcb-8d46-4fb0-8529-ccdcad6a5aa9" alt="" className="ticket-2-organizer-logo" />
                <img
                  src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=Sample%20ticket-2&choe=UTF-8"
                  alt=""
                  className="sample-ticket-2-qr"
                />
              </div>
            </div>
          </div>
          <button
          type="button"
          className="ticket-download-button"
          onClick={()=>onCapture('ticket-2')}
        >
          Download Ticket
        </button>
        </>
        )}
        {location.state.ticket === "ticket3" && (
          <>
          <div id="ticket-3">
            <img src={ticket3} alt="" className="sample-ticket-3-image" />
            <div className="ticket-3-outer">
              <div className="ticket-3-left-div">
                <img
                  src="https://trasol.in/wp-content/uploads/2021/12/trasol-logo-2.png"
                  alt=""
                  className="ticket-3-organizer-logo"
                />
                <img
                  src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=Sample%20ticket-3&choe=UTF-8"
                  alt=""
                  className="sample-ticket-3-qr"
                />
              </div>
              <div className="ticket-3-right-div">
                <img
                  src="https://ik.imagekit.io/ok2wgebfs/evento/Untitled__2_-removebg-preview.png?updatedAt=1689439802235"
                  alt=""
                  className="ticket-3-evento-logo"
                />
                <p className="ticket-3-event-name">Money Expo India 2023</p>
                <div className="ticket-3-data-div">
                  <h5 className="ticket-3Data">Name:</h5>
                  <h5 className="ticket-3Data">Mail ID:</h5>
                </div>
                <p className="ticket-3-address">
                  NESCO NESCO Center Western Express Highway Goregaon (East),
                  Mumbai 400063 Mumbai, MH 400063
                </p>
              </div>
            </div>
          </div>
          <button
          type="button"
          className="ticket-download-button"
          onClick={()=>onCapture('ticket-3')}
        >
          Download Ticket
        </button>
        </>
        )}
      </div>
    </div>
  );
}
