import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import "./Type.css";
import { CircularProgress } from "@mui/material";

export default function Type() {
  const location = useLocation();
  const [organizer, setOrganizer] = useState(false);
  const [member, setMember] = useState(false);
  const navigate = useNavigate();
  const navigateToHome= (email) =>{
    navigate("/home", {
      state: {
        email: email
      },
    });
  };
  const regUser = () => {
    var cat;
    if(organizer===false && member===false){
      return
    }
    else if(organizer===true && member===false){
      cat="organizer";
    }
    else if(organizer===false && member===true){
      cat="member";
    }
    alert(cat);
    document.getElementById("loading").style.display="block";
    // get form data and check for exist or not
    fetch("https://event-manager-api-git-main-deepraj0502.vercel.app/register", {
      method: "POST",
      body: JSON.stringify({
        name: location.state.name,
        password: location.state.password,
        email: location.state.email,
        category: cat
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    navigateToHome(location.state.email);
  };
  return (
    <div className="type-outer">
      <div className="type-inner">
        <div
          className="type-card"
          onClick={() => {
            setOrganizer(true);
            setMember(false);
          }}
        >
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/20944068.jpg?updatedAt=1684655280802"
            alt=""
            className="type-card-image"
          />
          <p className="type-card-text">I Am Organizer</p>
          <input type="radio" checked={organizer} />
        </div>
        <div
          className="type-card"
          onClick={() => {
            setOrganizer(false);
            setMember(true);
          }}
        >
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/7570842.jpg?updatedAt=1684655537090"
            alt=""
            className="type-card-image"
          />
          <p className="type-card-text">I Am Member</p>
          <input type="radio" checked={member} />
        </div>
      </div>
      <button type="button" className="type-confirm-button" onClick={regUser}>
      <p style={{height:"0px",display:"none"}} id="loading"><CircularProgress/></p>
        CONFIRM{" "}
        <MdNavigateNext
          fill="white"
          style={{
            width: "25px",
            height: "25px",
            position: "relative",
            top: "4px",
          }}
        />
      </button>
    </div>
  );
}
