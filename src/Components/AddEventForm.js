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
  const [upload1, setUpload1] = useState(0);
  const [upload2, setUpload2] = useState(0);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });
  const handleEventPoster = (e) => {
    setUpload1(1);
    const imageRef = ref(storage, e.target.files[0].name);
    uploadBytes(imageRef, e.target.files[0], "image").then(() => {
      getDownloadURL(imageRef).then((url6) => {
        setUrl(url6);
        setUpload1(2);
      });
    });
  };
  const handleorganizerLogo = (e) => {
    setUpload2(1);
    const imageRef2 = ref(storage, e.target.files[0].name);
    uploadBytes(imageRef2, e.target.files[0], "image").then(() => {
      getDownloadURL(imageRef2).then((url5) => {
        setUrl2(url5);
        setUpload2(2);
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
          ticket: "",
        });
        setSuccess(true);
      }
    }, 3000);
  };

  // console.log(url);
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
            <div style={{ padding: "50px" }}>
              <div
                className="like-info-div"
                style={{
                  height: "auto",
                  justifyContent: "center",
                  borderRadius: "10px",
                }}
              >
                {" "}
                <h1 className="likedEvent-heading">ADD YOUR EVENT</h1>
              </div>
              <form
                className="addevent-form"
                onSubmit={handleSubmit}
                action="addform#val='submit'"
              >
                <div className="event-div">
                  <h5 style={{ color: "#6671ff" }}>Event Details</h5>
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
                  <div className="add-loading-box">
                    {upload1 === 1 && (
                      <>
                        <div id="wrapper">
                          <div class="profile-main-loader">
                            <div class="loader">
                              <svg
                                class="circular-loader"
                                viewBox="25 25 50 50"
                              >
                                <circle
                                  class="loader-path"
                                  cx="50"
                                  cy="50"
                                  r="20"
                                  fill="none"
                                  stroke="#6671ff"
                                  stroke-width="2"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p id="uploading">UPLOADING...</p>
                      </>
                    )}
                    {upload1 === 2 && (
                      <>
                        <img
                          src="https://ik.imagekit.io/ok2wgebfs/evento/Animation-1706344830331-ezgif.com-loop-count.gif?updatedAt=1706345400605"
                          alt=""
                          className="add-loading-suc"
                        />
                        <p id="uploadingsuc">UPLOADED</p>
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: "block", width: "40%" }}>
                  <div className="organizer-div">
                    <h5 style={{ color: "#6671ff" }}>Organiser Details</h5>
                    <p className="add-form-label">
                      Organizer Logo<span>*</span>
                    </p>
                    <input
                      type="file"
                      id="organizerlogo"
                      className="add-form-input"
                      onChange={handleorganizerLogo}
                    />
                    <div className="add-loading-box">
                      {upload2 === 1 && (
                        <>
                          <div id="wrapper">
                            <div class="profile-main-loader">
                              <div class="loader">
                                <svg
                                  class="circular-loader"
                                  viewBox="25 25 50 50"
                                >
                                  <circle
                                    class="loader-path"
                                    cx="50"
                                    cy="50"
                                    r="20"
                                    fill="none"
                                    stroke="#6671ff"
                                    stroke-width="2"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <p id="uploading">UPLOADING...</p>
                        </>
                      )}
                      {upload2 === 2 && (
                        <>
                          <img
                            src="https://ik.imagekit.io/ok2wgebfs/evento/Animation-1706344830331-ezgif.com-loop-count.gif?updatedAt=1706345400605"
                            alt=""
                            className="add-loading-suc"
                          />
                          <p id="uploadingsuc">UPLOADED</p>
                        </>
                      )}
                    </div>
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
                    src="https://ik.imagekit.io/ok2wgebfs/evento/Online%20calendar-rafiki.png?updatedAt=1706343545111"
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
