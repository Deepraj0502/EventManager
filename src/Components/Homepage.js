import React, { useEffect, useState } from "react";
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

export default function Homepage() {
  const navigate = useNavigate();
  const browseRef = useRef(null);
  const scrollToBrowse = () => {
    browseRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const location = useLocation();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
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
  useEffect(() => {
    fetch("http://localhost:3000/getname", {
      method: "POST",
      body: JSON.stringify({
        email: location.state.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data["name"]);
      });
    fetch("http://localhost:3000/getpropic", {
      method: "POST",
      body: JSON.stringify({
        email: location.state.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response2) => response2.json())
      .then((data2) => {
        setUrl(data2["propic"]);
      });

    fetch("http://localhost:3000/getevents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response4) => response4.json())
      .then((data4) => {
        setEvents(data4);
      });

      fetch("http://localhost:3000/getlikes", {
        method: "POST",
        body: JSON.stringify({
          email: location.state.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response5) => response5.json())
        .then((data5) => {
          setLikes(data5);
        });
    setTimeout(() => setLoading(false), 1000);
  });
  const addlike = (name,date,time,loc) =>{
    fetch("http://localhost:3000/setlike", {
      method: "POST",
      body: JSON.stringify({
        email: location.state.email,
        eventdate: date,
        eventname: name,
        eventtime: time,
        eventlocation: loc
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    likes.push({eventname:name});
  }

  const deletelike = (name) =>{
    fetch("http://localhost:3000/deletelike", {
      method: "POST",
      body: JSON.stringify({
        email: location.state.email,
        eventname: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    likes.find((item,index)=>{
      if(item.eventname===name){
        console.log(index);
        likes.splice(index,1);
      }
      return 0;
    })
  }
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
          <form>
            <div className="home-search-div">
              <div className="home-search-button-div">
                <BiSearch className="home-search-button" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="home-search-bar"
              />
            </div>
          </form>
          <p className="home-dash-text">Dashboard</p>
          <div className="home-dash-outer">
            <div className="home-dash-inner">
              <div className="home-dash-inner-left">
                <p className="home-dash-wel">Welcome {name}</p>
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
                  src="https://ik.imagekit.io/ok2wgebfs/evento/360_F_334545763_330Jh62ukgHbSkBZOsTgjqLitlNAjoSd-removebg-preview.png?updatedAt=1684853008911"
                  alt=""
                  className="home-dash-img"
                />
              </div>
            </div>
          </div>
          <MediaQuery maxWidth={600}>
            <CalendarComp />
          </MediaQuery>
          <p className="home-dash-text">Latest Events</p>
          <CardComp />
          <p className="home-dash-text" ref={browseRef}>
            Browse Events
          </p>
          <div className="home-browse-outer">
            {events.reverse().map((val) => {
              return (
                <div className="home-browse-card">
                  <div className="home-browse-card-left">
                    <img
                      src={val['eventposter']}
                      alt=""
                      className="home-browse-image"
                    />
                  </div>
                  <div className="home-browse-card-right">
                    <p className="home-browse-name">{val['eventname']}</p>
                    <div style={{ display: "flex" }}>
                      <BiTimeFive
                        style={{
                          width: "18px",
                          height: "22px",
                          position: "relative",
                          top: "4px",
                        }}
                      />
                      <p className="home-browse-info">{val['eventtime']}</p>
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
                      {val['eventlocation']}
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
                      <p className="home-browse-info">{val['eventdate']}</p>
                    </div>
                    <button
                      type="button"
                      className="home-dash-button"
                      style={{ padding: "8px" }}
                      onClick={() => {
                        navigateToEventHome(val['eventname']);
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
                      onClick={()=>{
                        if(likes.some(item => item.eventname===val['eventname'])){
                          deletelike(val['eventname']);
                        }
                        else{
                          addlike(val['eventname'],val['eventdate'],val['eventtime'],val['eventlocation']);
                        }
                      }}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`browseHeart ${likes.some(item => item.eventname===val['eventname'])?"browseHeart-active":""}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-side-div">
          <div className="home-left-user-div">
            {url === "" && (
              <FaUserCircle style={{ width: "45px", height: "35px" }} />
            )}
            {url !== "" && (
              <img
                src={url}
                alt=""
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  marginRight: "5px",
                  objectFit: "cover",
                }}
              />
            )}
            <p className="home-left-username">{name}</p>
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
