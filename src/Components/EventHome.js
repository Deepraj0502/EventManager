import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventHome.css";
import { BiTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarEventFill } from "react-icons/bs";
import OrganiserCard from "./OrganiserCard";
import SimilarCard from "./SimilarCard";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { Button } from "rsuite";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  addDoc,
} from "firebase/firestore";
import { app } from "./FirebaseConfig";

export default function EventHome() {
  const db = getFirestore(app);
  const [scrollableModal, setScrollableModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const location = useLocation();

  const getParticularEvent = async () => {
    const colRef = query(collection(db, "events"));
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc) => {
      if (doc.data()["eventname"] === location.state.eventName) {
        setEvent(doc.data());
      }
    });
  };
  useEffect(() => {
    getParticularEvent();
    setTimeout(() => setLoading(false), 1000);
  });
  const navigate = useNavigate();
  const getTicket = () => {
    addDoc(collection(db, "registered"), {
      email: location.state.email,
      eventname: location.state.eventName,
    });
    navigate("/ticket", {
      state: {
        email: location.state.email,
        eventName: location.state.eventName,
        eventLoc: event["eventaddress"],
        eventDate: event["eventdate"],
        eventTime: event["eventtime"],
        ticket: event["ticket"],
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
      {!loading && (
        <>
          <MDBModal
            show={scrollableModal}
            setShow={setScrollableModal}
            tabIndex="-1"
          >
            <MDBModalDialog scrollable>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Confirmation</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={() => setScrollableModal(!scrollableModal)}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <p>Are you sure you want to register for this event</p>
                </MDBModalBody>
                <MDBModalFooter>
                  <Button
                    onClick={() => setScrollableModal(!setScrollableModal)}
                    className="home-form-btn"
                    style={{ background: "red", width: "100px" }}
                  >
                    No
                  </Button>
                  <Button
                    onClick={() => getTicket()}
                    className="home-form-btn"
                    style={{ background: "#6671ff", width: "150px" }}
                  >
                    Yes
                  </Button>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          <NavbarComp />
          <div
            className="home-inner eventhome-inner"
            style={{
              background: "white",
              flexDirection: "column",
              borderTopRightRadius: "0px",
            }}
          >
            <div
              style={{
                overflowY: "scroll",
                overflowX: "hidden",
                borderTopLeftRadius: "30px",
              }}
              className="eventhome-outer"
            >
              <div
                className="eventhome-image-div"
                style={{ background: `url(${event["eventposter"]})` }}
              ></div>
              <img
                src={event["eventposter"]}
                alt=""
                className="eventhome-image"
              />
              <div className="eventhome-main">
                <div className="eventhome-main-left">
                  <h1 style={{ fontWeight: "bold" }}>
                    {location.state.eventName}
                  </h1>
                  <p className="eventhome-date">{event["eventdate"]}</p>
                  {/* About Event */}
                  <div className="eventhome-about-div">
                    <p className="eventhome-about-head">About Event</p>
                    <p className="eventhome-about-para">{event["eventinfo"]}</p>
                  </div>
                  {/* When and Where */}
                  <div className="eventhome-ww-div">
                    <p className="eventhome-ww-head">When and Where</p>
                    <div className="ww-inside-div">
                      <div
                        style={{ width: "30%", borderRight: "1px solid gray" }}
                        className="ww-inside-left"
                      >
                        <div style={{ display: "flex" }}>
                          <BsCalendarEventFill
                            style={{
                              width: "40px",
                              height: "30px",
                              marginRight: "10px",
                              color: "#6671ff",
                              padding: "5px",
                              borderRadius: "5px",
                              background: "#f8f7fa",
                            }}
                          />
                          <p className="eventhome-ww-info">
                            {event["eventdate"]}
                          </p>
                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <BiTimeFive
                            style={{
                              width: "40px",
                              height: "30px",
                              marginRight: "10px",
                              color: "#6671ff",
                              padding: "5px",
                              borderRadius: "5px",
                              background: "#f8f7fa",
                            }}
                          />
                          <p className="eventhome-ww-info">
                            {event["eventtime"]}
                          </p>
                        </div>
                      </div>
                      <div style={{ width: "70%" }} className="ww-inside-right">
                        <div style={{ display: "flex" }}>
                          <MdLocationOn
                            style={{
                              width: "60px",
                              height: "30px",
                              marginRight: "10px",
                              color: "#6671ff",
                              marginLeft: "30px",
                              padding: "5px",
                              borderRadius: "5px",
                              background: "#f8f7fa",
                            }}
                            className="ww-right-loc"
                          />
                          <p className="eventhome-ww-info">
                            {event["eventaddress"]}{" "}
                          </p>
                        </div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${event[
                            "eventaddress"
                          ]
                            .split("")
                            .join("%20")}`}
                          className="show-in-map"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: `${
                              event["eventaddress"] === "Online"
                                ? "none"
                                : "block"
                            }`,
                          }}
                        >
                          Show in map
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* About Oraganiser */}
                  <div className="eventhome-about-div">
                    <p className="eventhome-about-head">Organised By</p>
                    <img
                      src={event["organizerlogo"]}
                      alt=""
                      className="organiser-logo"
                    />
                    <h3 style={{ fontWeight: "700" }}>{event.organizername}</h3>
                    <p className="organiser-para">{event["organizerinfo"]}</p>
                  </div>
                  {/* More Events */}
                  <OrganiserCard organizername={event.organizername} />
                  {/* Similar Events */}
                  <p
                    className="eventhome-about-head"
                    style={{ marginTop: "40px" }}
                  >
                    SIMILAR EVENTS
                  </p>
                  <SimilarCard />
                </div>
                <div className="eventhome-main-right">
                  <div className="eventhome-map">
                    <div
                      className="book-outer-div"
                      data-aos="fade-left"
                      data-aos-duration="8000"
                    >
                      <p className="reserve-head">RESERVE YOUR SEAT</p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ultrices mi tempus imperdiet nulla
                        malesuada.
                      </p>
                      <button
                        type="button"
                        className="reserve-button"
                        onClick={() => {
                          setScrollableModal(!scrollableModal);
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
