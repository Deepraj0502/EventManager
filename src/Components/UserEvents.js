import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LikedEvents.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./FirebaseConfig";
import "./UserEvents.css";

export default function UserEvents() {
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const location = useLocation();

  const navigateToTicket = () => {
    navigate("/ticket", {
      state: {
        email: location.state.email,
        eventName: events[0]["eventname"],
        eventLoc: events[0]["eventaddress"],
        eventDate: events[0]["eventdate"],
        eventTime: events[0]["eventtime"],
        ticket: events[0]["ticket"],
      },
    });
  };

  const navigateToHome = () => {
    navigate("/home", {
      state: {
        email: location.state.email,
      },
    });
  };
  const getRegisteredEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "registered"));
    querySnapshot.forEach(async (dat) => {
      if (dat.data()["email"] === location.state.email) {
        const querySnapshot1 = await getDocs(collection(db, "events"));
        querySnapshot1.forEach((e) => {
          if (e.data()["eventname"] === dat.data()["name"]) {
            setEvents((events) => [...events, e.data()]);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        });
      }
    });
  };

  useEffect(() => {
    getRegisteredEvents();
  }, []);
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
      <NavbarComp active="8" />
      <div
        className="home-inner"
        style={{
          display: "block",
          overflowY: "scroll",
          borderTopRightRadius: "0px",
          padding: "30px",
        }}
      >
        <div className="likedEvent-outer-div">
          <div
            className="like-info-div"
            style={{
              height: "auto",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            {" "}
            <h1 className="likedEvent-heading">REGISTERED EVENTS</h1>
          </div>
          <main className="likedEvent-main-div">
            {events.length === 0 && !loading && (
              <div
                className="like-info-div"
                style={{
                  height: "auto",
                  justifyContent: "center",
                  borderRadius: "10px",
                  width: "100%",
                  marginTop: "50px",
                }}
              >
                {" "}
                <div className="noEvent-div" style={{ color: "gray" }}>
                  <h1 style={{ textAlign: "center" }}>No Registration Found</h1>
                  <button
                    type="button"
                    className="home-dash-button"
                    style={{ padding: "8px" }}
                    onClick={() => {
                      navigateToHome();
                    }}
                  >
                    Explore Events
                  </button>
                </div>
              </div>
            )}
            {events.map((data, key) => {
              return (
                <>
                  <div key={key} className="likedEvent-inner-div">
                    <div className="likedEvent-img-knowBtn">
                      <img
                        src={data.eventposter}
                        alt={data.eventname}
                        className="likedEvent-poster"
                      />
                      <div
                        style={{ marginTop: "3px" }}
                        className="liked-heart"
                      ></div>
                    </div>
                    <div className="likedEvent-inner-left-div">
                      <h2 className="likedEvent-eventname">{data.eventname}</h2>
                      <p className="likedEvent-eventtime">
                        {data.eventdate} | {data.eventtime}
                      </p>
                      <p className="likedEvent-eventaddress">
                        {data.eventaddress}
                      </p>
                      <button
                        type="button"
                        className="home-dash-button"
                        onClick={navigateToTicket}
                      >
                        View Ticket
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </main>
        </div>
      </div>
    </div>
  );
}
