import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavbarComp from "./NavbarComp";
import "./AddEventForm.css";
import ticket1 from "../Images/ticket1.png";
import ticket2 from "../Images/ticket2.png";
import ticket3 from "../Images/ticket3.png";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { app } from "./FirebaseConfig";

export default function TicketSelect(props) {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  const navigate = useNavigate();
  const navigateToSuccess = (eventname, ticket, email, eventaddress) => {
    navigate("/success", {
      state: {
        email: email,
        eventname: eventname,
        ticket: ticket,
        eventaddress: eventaddress,
      },
    });
  };
  const handleTicket = async (ticket) => {
    const querySnapshot = await getDocs(collection(db, "events"));
    querySnapshot.forEach((dat) => {
      if (
        dat.data()["email"] === props.email &&
        dat.data()["eventname"] === props.eventname
      ) {
        const scoreRef = doc(db, "events", dat.id);
        updateDoc(scoreRef, {
          ticket: ticket,
        });
        navigateToSuccess(
          props.eventname,
          ticket,
          props.email,
          props.eventaddress
        );
      }
    });
  };
  return (
    <div>
      <div className="home-outer">
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
            display: "block",
            overflowY: "scroll",
            borderTopRightRadius: "0px",
          }}
        >
          <div style={{ padding: "50px" }}>
            <div
              className="like-info-div sample-ticket-heading"
              style={{
                height: "auto",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <h3 className="likedEvent-heading "> Select Ticket Template</h3>
            </div>
            <div className="ticket-outer-div">
              <img
                src={ticket1}
                alt=""
                className="ticket-image"
                onClick={() => handleTicket("ticket1")}
              />
              <img
                src={ticket2}
                alt=""
                className="ticket-image"
                onClick={() => handleTicket("ticket2")}
              />
              <img
                src={ticket3}
                alt=""
                className="ticket-image"
                onClick={() => handleTicket("ticket3")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
