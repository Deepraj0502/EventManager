import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LikedEvents.css";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  getFirestore,
  doc,
} from "firebase/firestore";
import { app } from "./FirebaseConfig";
import Heart from "react-heart";

export default function LikedEvents() {
  const db = getFirestore(app);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [likes, setLikes] = useState([]);
  const location = useLocation();

  const navigateToEventHome = (name) => {
    navigate("/eventhome", {
      state: {
        email: location.state.email,
        eventName: name,
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

  const getEventForUser = async (eName) => {
    const querySnapshot1 = await getDocs(collection(db, "events"));
    querySnapshot1.forEach((e) => {
      if (e.data()["eventname"] === eName) {
        setEvents((events) => [...events, e.data()]);
      }
      setLoading(false);
    });
  };
  const getLikedEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "likes"));
    querySnapshot.forEach((dat) => {
      if (dat.data()["user"] === location.state.email) {
        getEventForUser(dat.data()["eventName"]);
        setLikes((likes) => [...likes, dat.data()]);
      }
    });
  };

  console.log(events);

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

  useEffect(() => {
    getLikedEvents();
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
            <h1 className="likedEvent-heading">LIKED EVENTS</h1>
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
                  <h1 style={{ textAlign: "center" }}>
                    Add Your Favourite Events
                  </h1>
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
                    <div className="likedEvent-inner-left-div">
                      <h2 className="likedEvent-eventname">{data.eventname}</h2>
                      <p className="likedEvent-eventtime">
                        {data.eventdate} | {data.eventtime}
                      </p>
                      <p className="likedEvent-eventaddress">
                        {data.eventaddress}
                      </p>
                      <div className="likedEvent-heartBtn">
                        <button
                          type="button"
                          className="home-dash-button"
                          style={{ padding: "8px" }}
                          onClick={() => {
                            navigateToEventHome(data.eventname);
                          }}
                        >
                          Know More
                        </button>
                      </div>
                    </div>
                    <div className="likedEvent-img-knowBtn">
                      <img
                        src={data.eventposter}
                        alt={data.eventname}
                        className="likedEvent-poster"
                      />
                      <div
                        style={{ marginTop: "3px", zIndex: "999" }}
                        className="liked-heart"
                      >
                        <Heart
                          onClick={() => {
                            if (
                              likes.some(
                                (item) => item.eventName === data["eventname"]
                              )
                            ) {
                              deletelike(data["eventname"]);
                            } else {
                              addlike(
                                data["eventname"],
                                data["eventdate"],
                                data["eventtime"],
                                data["eventaddress"]
                              );
                            }
                          }}
                          animationScale={1.2}
                          animationTrigger="both"
                          animationDuration={0.2}
                          className={`browseHeart ${
                            likes.some(
                              (item) => item.eventName === data["eventname"]
                            )
                              ? "browseHeart-active"
                              : ""
                          }`}
                        />
                      </div>
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
