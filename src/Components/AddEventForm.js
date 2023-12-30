import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NavbarComp from "./NavbarComp";
import "./AddEventForm.css";
import { storage } from "./FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import TicketSelect from "./TicketSelect";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import { app } from "./FirebaseConfig";

export default function AddEventForm() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");
  const [eventname, setEventName] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  const handleEventPoster = (e) => {
    const imageRef = ref(storage, e.target.files[0].name);
    uploadBytes(imageRef, e.target.files[0], "image").then(() => {
      getDownloadURL(imageRef).then((url6) => {
        setUrl(url6);
      });
    });
  };
  const handleorganizerLogo = (e) => {
    const imageRef2 = ref(storage, e.target.files[0].name);
    uploadBytes(imageRef2, e.target.files[0], "image").then(() => {
      getDownloadURL(imageRef2).then((url5) => {
        setUrl2(url5);
      });
    });
  };

  const db = getFirestore(app);
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      setLoading(true);
      var pass = 1;
      for (let index = 0; index < 11; index++) {
        if (e.target[index].value === "") {
          e.target[index].style.border = "1px solid red";
          pass = 0;
        } else {
          e.target[index].style.border = "none";
        }
      }
      if (pass === 1) {
        setEventName(e.target[0].value);
        addDoc(collection(db, "events"), {
          email: location.state.email,
          eventname: e.target[0].value,
          eventinfo: e.target[1].value,
          eventdate: e.target[2].value,
          eventtime: e.target[3].value,
          eventcity: e.target[4].value,
          eventaddress: e.target[5].value,
          eventcategory: e.target[6].value,
          eventposter: url,
          organizerlogo: url2,
          organizername: e.target[9].value,
          organizerinfo: e.target[10].value,
          ticket:"",
        });
        setSuccess(true);
      }
    }, 3000);
  };
  return (
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

      {!success && (
        <>
          <div
            className="home-inner"
            style={{
              display: "block",
              overflowY: "scroll",
              borderTopRightRadius: "0px",
            }}
          >
            <img
              src="https://ik.imagekit.io/ok2wgebfs/evento/addevent-bg.png?updatedAt=1689659150762"
              alt=""
              className="add-event-bg"
            />

            <div style={{ padding: "50px" }}>
              <h1 className="details-head">Add Your Event</h1>
              <form
                className="addevent-form"
                onSubmit={handleSubmit}
                action="addform#val='submit'"
              >
                <div className="event-div">
                  <h5 style={{ color: "#9973f3" }}>Event Details</h5>
                  <p className="add-form-label">
                    Event Name
                    <span>
                      <span>*</span>
                    </span>
                  </p>
                  <input
                    type="text"
                    id="eventname"
                    placeholder="Enter Here"
                    className="add-form-input"
                  />
                  <p className="add-form-label">
                    Event Description
                    <span>
                      <span>*</span>
                    </span>
                  </p>
                  <textarea
                    rows="2"
                    cols="2"
                    placeholder="Enter Details"
                    className="add-form-input"
                    id="eventinfo"
                  ></textarea>
                  <p className="add-form-label">
                    Event Date<span>*</span>
                  </p>
                  <input
                    type="text"
                    id="eventdate"
                    placeholder="July 15, 2023"
                    className="add-form-input"
                  />
                  <p className="add-form-label">
                    Event Time<span>*</span>
                  </p>
                  <input
                    type="text"
                    id="eventtime"
                    placeholder="10AM - 6PM"
                    className="add-form-input"
                  />
                  <p className="add-form-label">
                    City<span>*</span>
                  </p>
                  <input
                    type="text"
                    id="eventcity"
                    placeholder="Mumbai"
                    className="add-form-input"
                  />
                  <p className="add-form-label">
                    Event Address<span>*</span>
                  </p>
                  <textarea
                    rows="2"
                    cols="2"
                    placeholder="Enter Here"
                    className="add-form-input"
                    id="eventaddress"
                  ></textarea>
                  <p className="add-form-label">
                    Event Category<span>*</span>
                  </p>
                  <input
                    type="text"
                    id="eventcategory"
                    placeholder="Medical/Technology"
                    className="add-form-input"
                  />
                  <p className="add-form-label">
                    Event Poster<span>*</span>
                  </p>
                  <input
                    type="file"
                    id="eventposter"
                    className="add-form-input"
                    onChange={handleEventPoster}
                  />
                </div>
                <div style={{ display: "block", width: "40%" }}>
                  <div className="organizer-div">
                    <h5 style={{ color: "#9973f3" }}>Organiser Details</h5>
                    <p className="add-form-label">
                      Organizer Logo<span>*</span>
                    </p>
                    <input
                      type="file"
                      id="organizerlogo"
                      className="add-form-input"
                      onChange={handleorganizerLogo}
                    />
                    <p className="add-form-label">
                      Organiser Name<span>*</span>
                    </p>
                    <input
                      type="text"
                      id="organizername"
                      placeholder="Enter Here"
                      className="add-form-input"
                    />
                    <p className="add-form-label">
                      Organiser Description<span>*</span>
                    </p>
                    <textarea
                      rows="2"
                      cols="2"
                      placeholder="Enter Details"
                      className="add-form-input"
                      id="organizerinfo"
                    ></textarea>

                    <input
                      type="submit"
                      value="Next"
                      className="add-form-submit"
                    />
                  </div>
                  <img
                    src="https://img.freepik.com/free-vector/build-your-program-appointment-booking_23-2148552954.jpg?size=626&ext=jpg&ga=GA1.1.2034402480.1684136925&semt=ais"
                    alt=""
                    className="add-event-vector"
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {success && (
        <>
          <TicketSelect eventname={eventname} email={location.state.email} />
        </>
      )}
    </div>
  );
}
