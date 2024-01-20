import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import Heart from "react-heart";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { app } from "./FirebaseConfig";

export default function OrganiserCard({ organizername }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const db = getFirestore(app);
  const [events, setEvents] = useState([]);
  const [likes, setLikes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToEventHome = (name) => {
    navigate("/eventhome", {
      state: {
        email: location.state.email,
        eventName: name,
      },
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
      if (organizername === doc3.data()["organizername"]) {
        if (location.state.eventName !== doc3.data()["eventname"]) {
          setEvents((events) => [...events, doc3.data()]);
        }
      }
    });
  };
  useEffect(() => {
    getLikesData();
    getEventsData();
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

  console.log(events);
  return (
    <div>
      {events.length > 0 && (
        <>
          <p className="eventhome-about-head" style={{ marginTop: "40px" }}>
            MORE EVENTS BY {organizername}
          </p>
          <Carousel responsive={responsive}>
            {events
              .filter((item, index) => index < 6)
              .map((val) => {
                return (
                  <div className="home-card-outer">
                    <Card sx={{ width: 340, height: 450 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={val["eventposter"]}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            <p className="home-card-name">{val["eventname"]}</p>
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <div style={{ display: "flex" }}>
                              <BiTimeFive
                                style={{ width: "18px", height: "22px" }}
                              />
                              <p className="home-card-info">
                                {val["eventtime"]}
                              </p>
                            </div>
                            <div style={{ display: "flex", marginTop: "-5px" }}>
                              <MdLocationOn
                                style={{ width: "18px", height: "22px" }}
                              />
                              <p className="home-card-info">
                                {val["eventaddress"]}
                              </p>
                            </div>
                            <div style={{ display: "flex", marginTop: "-5px" }}>
                              <BsCalendarDate
                                style={{ width: "18px", height: "22px" }}
                              />
                              <p className="home-card-info">
                                {val["eventdate"]}
                              </p>
                            </div>
                            <div className="similar-btn-and-like">
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
                              <Heart
                                onClick={() => {
                                  if (
                                    likes.some(
                                      (item) =>
                                        item.eventName === val["eventname"]
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
                                    (item) =>
                                      item.eventName === val["eventname"]
                                  )
                                    ? "browseHeart-active"
                                    : ""
                                }`}
                              />
                            </div>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </div>
                );
              })}
          </Carousel>
        </>
      )}
    </div>
  );
}
