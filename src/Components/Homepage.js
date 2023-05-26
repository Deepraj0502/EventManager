import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarComp from "./NavbarComp";
import "./Homepage.css";
import Calendar from "./Calendar";
import { BiTimeFive, BiSearch } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import CardComp from "./CardComp";
import Heart from "react-heart";
import MediaQuery from "react-responsive";

export default function Homepage() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://event-manager-api-git-main-deepraj0502.vercel.app/getname", {
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
    fetch(
      "https://event-manager-api-git-main-deepraj0502.vercel.app/getpropic",
      {
        method: "POST",
        body: JSON.stringify({
          email: location.state.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUrl(data["propic"]);
      });
    setTimeout(() => setLoading(false), 1000);
  });
  return (
    <div className="home-outer">
      {loading && (
        <div className="loading-background">
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/image-processing20210904-26665-unscreen.gif?updatedAt=1684985103292"
            alt=""
            style={{ position: "absolute", zIndex: "99" }}
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
                <button type="button" className="home-dash-button">
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
          <p className="home-dash-text">Latest Events</p>
          <CardComp />
          <MediaQuery maxWidth={600}><Calendar /></MediaQuery>
          <p className="home-dash-text">Browse Events</p>
          <div className="home-browse-outer">
            <div className="home-browse-card">
              <div className="home-browse-card-left">
                <img
                  src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F444862499%2F1394200320313%2F1%2Foriginal.20230213-054456?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1200%2C600&s=5f077de2efa38fca69811aecdec575cd"
                  alt=""
                  className="home-browse-image"
                />
              </div>
              <div className="home-browse-card-right">
                <p className="home-browse-name">Money Expo India 2023</p>
                <div style={{ display: "flex" }}>
                  <BiTimeFive
                    style={{
                      width: "18px",
                      height: "22px",
                      position: "relative",
                      top: "4px",
                    }}
                  />
                  <p className="home-card-info">10:00 AM</p>
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
                  <p className="home-card-info">Jio World Convention Centre</p>
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
                  <p className="home-card-info">Sat, Aug 12</p>
                </div>
                <button
                  type="button"
                  className="home-dash-button"
                  style={{ padding: "8px" }}
                >
                  Know More
                </button>
              </div>
              <div style={{ width: "100%",marginTop:"3px" }}>
                <Heart
                  isActive={active}
                  onClick={() => setActive(!active)}
                  animationScale={1.2}
                  animationTrigger="both"
                  animationDuration={0.2}
                  className={`customHeart${active ? " active" : ""} browseHeart`}
                />
              </div>
            </div>
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
                }}
              />
            )}
            <p className="home-left-username">{name}</p>
          </div>
          <Calendar />
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
