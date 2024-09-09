import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarComp from "./NavbarComp";
import "./Homepage.css";
import CalendarComp from "./CalendarComp";
import { BiTimeFive, BiSearch } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CardComp from "./CardComp";
import Heart from "react-heart";
import MediaQuery from "react-responsive";
import {
  collection,
  getDocs,
  query,
  addDoc,
  deleteDoc,
  getFirestore,
  doc,
} from "firebase/firestore";

import { app } from "./FirebaseConfig";

export default function Homepage() {
  const db = getFirestore(app);
  const navigate = useNavigate();
  const browseRef = useRef(null);
  const scrollToBrowse = () => {
    browseRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const location = useLocation();
  const [userData, setUserData] = useState({
    name: "",
    propic: "",
  });
  const [events, setEvents] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateToEventHome = (name) => {
    navigate("/eventhome", {
      state: {
        email: location.state.email,
        eventName: name,
      },
    });
  };
  const getUserData = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data()["email"] === location.state.email) {
        setUserData({
          name: doc.data()["name"],
          category: doc.data()["category"],
          propic: doc.data()["profilepic"],
        });
      }
    });
  };
  const getLikesData = async () => {
    const q2 = query(collection(db, "likes"));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc2) => {
      if (doc2.data()["user"] === location.state.email) {
        setLikes((likes) => [...likes, doc2.data()]);
      }
    });
  };
  const getEventsData = async () => {
    const q3 = query(collection(db, "events"));
    const querySnapshot3 = await getDocs(q3);
    querySnapshot3.forEach((doc3) => {
      setEvents((events) => [...events, doc3.data()]);
    });
  };
  useEffect(() => {
    getUserData();
    getLikesData();
    getEventsData();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const addlike = async (name, date, time, loc) => {
    addDoc(collection(db, "likes"), {
      user: location.state.email,
      eventName: name,
    });
    setLikes((likes) => [
      ...likes,
      {
        eventName: name,
        user: location.state.email,
      },
    ]);
  };

  const deletelike = async (name) => {
    const querySnapshot = await getDocs(collection(db, "likes"));
    querySnapshot.forEach((dat) => {
      if (
        dat.data()["eventName"] === name &&
        dat.data()["user"] === location.state.email
      ) {
        const scoreRef = doc(db, "likes", dat.id);
        deleteDoc(scoreRef);
      }
    });
    setLikes(likes.filter((event) => event.eventName !== name));
  };

  const [searchEvent, setSearchEvent] = useState("");

  const handleChange = (e) => {
    setSearchEvent(e);
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.eventname.toLowerCase().includes(searchEvent.toLowerCase())
    );
  }, [events, searchEvent]);

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
      <NavbarComp active="1" />
      <div className="home-inner">
        <div className="home-main-div">
          <div className="home-search-div">
            <div className="home-search-button-div">
              <BiSearch className="home-search-button" />
            </div>
            <input
              type="text"
              name="searchEvent"
              placeholder="Search"
              className="home-search-bar"
              value={searchEvent}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <p className="home-dash-text">Dashboard</p>
          <div className="home-dash-outer">
            <div className="home-dash-inner">
              <div className="home-dash-inner-left">
                <p className="home-dash-wel">Welcome {userData.name}</p>
                <p>
                  Explore various event and get a digitalized entry and also get
                  a verified certificate for the event.
                </p>
                <button
                  type="button"
                  className="home-dash-button"
                  onClick={scrollToBrowse}
                >
                  Explore Events
                </button>
              </div>
              <div className="home-dash-inner-right">
                <img
                  src="https://ik.imagekit.io/ok2wgebfs/evento/Calendar.gif?updatedAt=1703923837967"
                  alt=""
                  className="home-dash-img"
                />
              </div>
            </div>
          </div>
          <MediaQuery maxWidth={600}>
            <CalendarComp />
          </MediaQuery>
          {/* <p className="home-dash-text">Latest Events</p> */}
          {/* <CardComp /> */}
          <p className="home-dash-text" ref={browseRef}>
            Browse Events
            {searchEvent && (
              <p className="text-lg font-normal">
                Searching result for <b>{searchEvent}</b>
              </p>
            )}
          </p>

          <div className="home-browse-outer">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((val) => {
                return (
                  <>
                    <div className="home-browse-card">
                      <div className="home-browse-card-left">
                        <img
                          src={val["eventposter"]}
                          alt=""
                          className="home-browse-image"
                        />
                      </div>
                      <div className="home-browse-card-right">
                        <p className="home-browse-name">{val["eventname"]}</p>
                        <div style={{ display: "flex" }}>
                          <BiTimeFive
                            style={{
                              width: "18px",
                              height: "22px",
                              position: "relative",
                              top: "4px",
                            }}
                          />
                          <p className="home-browse-info">{val["eventtime"]}</p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <MdLocationOn
                            style={{
                              width: "18px",
                              height: "22px",
                              position: "relative",
                              top: "4px",
                            }}
                          />
                          <p className="home-browse-info">
                            {val["eventaddress"]}
                          </p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <BsCalendarDate
                            style={{
                              width: "18px",
                              height: "22px",
                              position: "relative",
                              top: "4px",
                            }}
                          />
                          <p className="home-browse-info">{val["eventdate"]}</p>
                        </div>
                        <button
                          type="button"
                          className="home-dash-button"
                          style={{ padding: "8px" }}
                          onClick={() => {
                            navigateToEventHome(val["eventname"]);
                          }}
                        >
                          Know More
                        </button>
                      </div>
                      <div
                        style={{ width: "10%", marginTop: "3px" }}
                        className="heart-outer-div"
                      >
                        <Heart
                          onClick={() => {
                            if (
                              likes.some(
                                (item) => item.eventName === val["eventname"]
                              )
                            ) {
                              deletelike(val["eventname"]);
                            } else {
                              addlike(
                                val["eventname"],
                                val["eventdate"],
                                val["eventtime"],
                                val["eventaddress"]
                              );
                            }
                          }}
                          animationScale={1.2}
                          animationTrigger="both"
                          animationDuration={0.2}
                          className={`browseHeart ${
                            likes.some(
                              (item) => item.eventName === val["eventname"]
                            )
                              ? "browseHeart-active"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>
                <div className="flex flex-col gap-4 items-center bg-[#DBE4FA] p-4 rounded-3xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-20 h-20"
                  >
                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                  </svg>
                  <p className="text-xl">
                    Sorry, we couldn't find the results for <b>{searchEvent}</b>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="home-side-div">
          <div className="home-left-user-div">
            <p className="home-left-username">{userData.name}</p>
            {userData.propic === "" && (
              <FaUserCircle style={{ width: "45px", height: "35px" }} />
            )}
            {userData.propic !== "" && (
              <img
                src={userData.propic}
                alt=""
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <CalendarComp />
          <div className="home-recent-outer">
            <p className="recent-text">Recent Events</p>
            <div className="recent-card">
              <div className="recent-card-left"></div>
              <div className="recent-card-right">
                <p className="recent-event-name">Event Name</p>
                <div className="recent-event-info">
                  <BiTimeFive style={{ width: "18px", height: "22px" }} />
                  <p>10 May,2023</p>
                  <p> || </p>
                  <p>10:00 am</p>
                </div>
                <div className="recent-event-location">
                  <MdLocationOn style={{ width: "18px", height: "22px" }} />
                  <p style={{ marginLeft: "7px" }}>Location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
