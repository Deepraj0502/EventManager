import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation } from "react-router-dom";
import ticket1 from "../Images/ticket1.png";
import ticket2 from "../Images/ticket2.png";
import ticket3 from "../Images/ticket3.png";
import "./SampleTicket.css";

export default function SampleTicket() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  const location = useLocation();

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
        {
          location.state.ticket==="ticket2" &&
          <div id="ticket">
          <img
            src={ticket1}
            alt=""
            className="sample-ticket-image"
          />
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
                <h5 className="ticketData">
                  Mail ID:
                </h5>
              </div>
              <p className="ticket-address">NESCO NESCO Center Western Express Highway Goregaon (East), Mumbai 400063 Mumbai, MH 400063</p>
            </div>
          </div>
        </div>
        }
        {
          location.state.ticket==="ticket1" &&
          <div id="ticket">
          <img
            src={ticket2}
            alt=""
            className="sample-ticket-image"
          />
          <div className="ticket-outer">
            <div className="ticket-left-div" style={{width:"74%"}}>
            <img
                src="https://ik.imagekit.io/ok2wgebfs/evento/Untitled__2_-removebg-preview.png?updatedAt=1689439802235"
                alt=""
                className="ticket-evento-logo"
              />
              <p className="ticket-event-name">Money Expo India 2023</p>
              <div className="ticket-data-div">
                <h5 className="ticketData">Name:</h5>
                <h5 className="ticketData">
                  Mail ID:
                </h5>
              </div>
              <p className="ticket-address">NESCO NESCO Center Western Express Highway Goregaon (East), Mumbai 400063 Mumbai, MH 400063</p>

            </div>
            <div className="ticket-right-div" style={{width:"32%"}}>
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
          </div>
        </div>
        }
        {
          location.state.ticket==="ticket3" &&
          <div id="ticket">
          <img
            src={ticket3}
            alt=""
            className="sample-ticket-image"
          />
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
                <h5 className="ticketData">
                  Mail ID:
                </h5>
              </div>
              <p className="ticket-address">NESCO NESCO Center Western Express Highway Goregaon (East), Mumbai 400063 Mumbai, MH 400063</p>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}
