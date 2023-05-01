import React, { useEffect, useState } from "react";
import "./Events.css";
import { GoLocation } from "react-icons/go";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

export default function YourEvent() {
  const [data, setData] = useState([]);
  const like = (name) => {
    fetch("http://127.0.0.1:8000/addlike", {
      method: 'POST',
      body: JSON.stringify({
        "name":name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    window.location.reload();
  };
  const removelike = (name) => {
    fetch("http://127.0.0.1:8000/removelike", {
      method: 'POST',
      body: JSON.stringify({
        "name":name
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    window.location.reload();
  };
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/getyourevents")
    .then((response) => response.json())
    .then((data) => {
      setData(data["events"]);
    });
  },[]);
  return (
    <div>
      <h1 className="event-head-name">Your Events</h1>
      {data.map((value) => (
        <div className="event-outer-box">
          <div className="event-inner-box">
            <img
              src={value[5]}
              alt=""
              className="event-image"
            />
            <div style={{ marginLeft: "20px" }}>
              <h1 className="event-name">{value[1]}</h1>
              <p className="event-date">Event Date: {value[2]}</p>
              <p className="event-location">
                <GoLocation />
                {value[3]}
              </p>
              { value[4]=="false" &&
                <p>
                <AiOutlineHeart className="like-icon" onClick={()=>like(value[1])} />
                <span className="like-text1">Add to favorate</span>
              </p>
              }
              { value[4]=="true" &&
                <p>
                <AiFillHeart
                  fill="red"
                  className="like-icon-red"
                  onClick={()=>removelike(value[1])} 
                />
                <span className="like-text2">Added to favorate</span>
              </p>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
