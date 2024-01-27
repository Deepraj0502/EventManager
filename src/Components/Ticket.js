import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation, useNavigate } from "react-router-dom";
import ticket1 from "../Images/ticket1.png";
import ticket2 from "../Images/ticket2.png";
import ticket3 from "../Images/ticket3.png";
import "./SampleTicket.css";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { collection, getDocs, query, getFirestore } from "firebase/firestore";
import { app } from "./FirebaseConfig";

export default function Ticket() {
  const db = getFirestore(app);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mob: "",
  });
  const [link, setLink] = useState("");
  const location = useLocation();
  const getUserData = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data()["email"] === location.state.email) {
        setUserData({
          name: doc.data()["name"],
          email: doc.data()["email"],
          mob: doc.data()["mobileNo"],
        });
        setLink(
          "https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=" +
            doc.data()["name"] +
            "," +
            doc.data()["email"] +
            "," +
            location.state.eventName
        );
      }
    });
  };
  useEffect(() => {
    getUserData();
  });
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home", {
      state: {
        email: location.state.email,
      },
    });
  };
  const onCapture = (tickettype) => {
    htmlToImage
      .toPng(document.getElementById(tickettype))
      .then(function (dataUrl) {
        saveAs(dataUrl, location.state.eventName + ".png");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div>
      {userData.name === "" && (
        <div className="loading-background">
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/loading.gif?updatedAt=1685464907954"
            alt=""
            style={{ position: "absolute", zIndex: "99" }}
            className="global-loading-gif"
          />
        </div>
      )}
      {userData.name !== "" && (
        <>
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
            <div
              className="like-info-div sample-ticket-heading"
              style={{
                height: "auto",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <h3 className="likedEvent-heading ">Your Ticket</h3>
            </div>
            <div className="sample-outer">
              {location.state.ticket === "ticket1" && (
                <>
                  <div className="sample-inner">
                    <div id="ticket">
                      <img
                        src={ticket1}
                        alt=""
                        className="sample-ticket-image"
                      />
                      <div className="ticket-outer">
                        <div className="ticket-left-div">
                          <img src={link} alt="" className="sample-ticket-qr" />
                        </div>
                        <div className="ticket-right-div">
                          <h1 className="ticket-evento-logo">EVENTO</h1>

                          <p className="ticket-event-name">
                            {location.state.eventName}
                          </p>
                          <div className="ticket-data-div">
                            <h5 className="ticketData">
                              Name: {userData.name}
                            </h5>
                            <h5 className="ticketData">
                              Mail ID: {userData.email}
                            </h5>
                          </div>
                          <p className="ticket-address">
                            {location.state.eventLoc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ticket-download-button"
                    onClick={() => onCapture("ticket")}
                  >
                    Download Ticket
                  </button>
                </>
              )}
              {location.state.ticket === "ticket2" && (
                <>
                  <div className="sample-inner">
                    <div id="ticket-2">
                      <img
                        src={ticket2}
                        alt=""
                        className="sample-ticket-2-image"
                      />
                      <div className="ticket-2-outer">
                        <div className="ticket-2-left-div">
                          <h1 className="ticket-evento-logo">EVENTO</h1>

                          <p className="ticket-2-event-name">
                            {location.state.eventName}
                          </p>
                          <div className="ticket-2-data-div">
                            <h5 className="ticket-2Data">
                              Name: {userData.name}
                            </h5>
                            <h5 className="ticket-2Data">
                              Mail ID: {userData.email}
                            </h5>
                          </div>
                          <div style={{ display: "flex", width: "100%" }}>
                            <p className="ticket-2-address">
                              {location.state.eventLoc}
                            </p>
                            <p className="ticket-2-date">
                              {location.state.eventDate}
                            </p>
                            <p className="ticket-2-time">
                              {location.state.eventTime}
                            </p>
                          </div>
                        </div>
                        <div className="ticket-2-right-div">
                          <img
                            src={link}
                            alt=""
                            className="sample-ticket-2-qr"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ticket-download-button"
                    onClick={() => onCapture("ticket-2")}
                  >
                    Download Ticket
                  </button>
                </>
              )}
              {location.state.ticket === "ticket3" && (
                <>
                  <div className="sample-inner">
                    <div id="ticket-3">
                      <img
                        src={ticket3}
                        alt=""
                        className="sample-ticket-3-image"
                      />
                      <div className="ticket-3-outer">
                        <div className="ticket-3-left-div">
                          <img
                            src={link}
                            alt=""
                            className="sample-ticket-3-qr"
                          />
                        </div>
                        <div className="ticket-3-right-div">
                          <h1 className="ticket-evento-logo">EVENTO</h1>

                          <p className="ticket-event-name">
                            {location.state.eventName}
                          </p>
                          <div className="ticket-data-div">
                            <h5 className="ticketData">
                              Name: {userData.name}
                            </h5>
                            <h5 className="ticketData">
                              Mail ID: {userData.email}
                            </h5>
                          </div>
                          <p className="ticket-3-address">
                            {location.state.eventLoc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ticket-download-button"
                    onClick={() => onCapture("ticket-3")}
                  >
                    Download Ticket
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
