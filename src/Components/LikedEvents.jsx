import React, { useEffect, useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation } from "react-router-dom";
import "./LikedEvents.css";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./FirebaseConfig";

export default function LikedEvents() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const location = useLocation();

  const getEventForUser = async (eName) => {
    const querySnapshot1 = await getDocs(collection(db, "events"));
    querySnapshot1.forEach((e) => {
      if (e.data()["eventname"] === eName) {
        setEvents((events) => [...events, e.data()]);
      }
    });
  };
  const getLikedEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "likes"));
    querySnapshot.forEach((dat) => {
      if (dat.data()["user"] === location.state.email) {
        getEventForUser(dat.data()["eventName"]);
      }
    });
  };

  useEffect(() => {
    getLikedEvents();
    setTimeout(() => setLoading(false), 1000);
  }, []);
  console.log(events);
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
        }}
      >
        <div className="likedEvent-outer-div">
          <h1 className="likedEvent-heading">Your Likes</h1>
          {/* {events.map((data, key) => {
            return (
              <> */}
          <main>
            <div>
              <h2>awµw ca</h2>
              <p>Septemper 20, 2023 | 10:00 - 12:00</p>
              <p>sb q;kdgnq</p>
            </div>
            <div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/evento-386813.appspot.com/o/WhatsApp%20Image%202023-10-12%20at%2012.47.04%20AM.jpeg?alt=media&token=603412a3-239f-4556-bae1-62dc8f5afcb8"
                alt=""
              />
            </div>
          </main>
          {/* </>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}
