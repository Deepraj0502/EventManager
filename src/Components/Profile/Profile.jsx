import "./Profile.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import NavbarComp from "../NavbarComp";
import Graph from "./Graph/Graph";
import Card from "./Card/Card";
import Card2 from "./Card/Card2";
import { FaUserCircle } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { storage } from "../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MobileNumber from "./MobileNumber";
import MediaQuery from "react-responsive";

export default function App() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
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
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const data = [
    {
      monthName: month[d.getMonth() - 2],
      eventAttain: 2,
      events: 3,
    },
    {
      monthName: month[d.getMonth() - 1],
      eventAttain: 5,
      events: 5,
    },
    {
      monthName: month[d.getMonth()],
      eventAttain: 0,
      events: 2,
    },
  ];
  const deleteProfilePic = () => {
    setUrl("");
    fetch(
      "https://event-manager-api-git-main-deepraj0502.vercel.app/setpropic",
      {
        method: "POST",
        body: JSON.stringify({
          email: location.state.email,
          url: "",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  const handleImageChange = (e) => {
    const imageRef = ref(storage, name);
    uploadBytes(imageRef, e.target.files[0]).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setUrl(url);
        fetch(
          "https://event-manager-api-git-main-deepraj0502.vercel.app/setpropic",
          {
            method: "POST",
            body: JSON.stringify({
              email: location.state.email,
              url: url,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
    });
  };
  return (
    <>
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
      <div className="profile-outer-div">
        <NavbarComp active="2" />

        <div className="profile-inner-div">
          <div className="profile-info-div">
            <div className="user-profile-div">
              {url === "" && (
                <FaUserCircle className="profile-image" id="profile-image" color="gray" />
              )}
              {url !== "" && (
                <img
                  src={url}
                  alt=""
                  className="profile-upload-image"
                  id="profile-upload-image"
                />
              )}
              <MediaQuery maxWidth={600}>
                <DropdownButton id="dropdown-basic-button" title="">
                  <Dropdown.Item href="#/action-1">
                    <input type="file" onChange={handleImageChange} />
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      paddingLeft: "20px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                    }}
                    onClick={deleteProfilePic}
                  >
                    Delete Profile Photo
                  </Dropdown.Item>
                </DropdownButton>
              </MediaQuery>
            </div>
            <div className="profile-inner-info">
              <p className="profile-name">{name}</p>
              <div style={{textAlign:"left"}}>
                <div style={{ display: "flex", marginTop: "-5px" }}>
                  <HiMail
                    style={{ width: "20px", height: "22px", color: "#6671FF" }}
                    className="user-info-logo"
                  />
                  <p className="profile-details">{location.state.email}</p>
                </div>
                <div style={{ display: "flex", marginTop: "-5px" }}>
                  <BsTelephoneFill
                    style={{ width: "18px", height: "20px", color: "#6671FF" }}
                    className="user-info-logo"
                  />
                  <p className="profile-details">
                    <MobileNumber email={location.state.email} />
                  </p>
                </div>
              </div>
              <MediaQuery minWidth={601}>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Profile Photo"
                >
                  <Dropdown.Item href="#/action-1">
                    <input type="file" onChange={handleImageChange} />
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{
                      paddingLeft: "20px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      color: "red",
                    }}
                    onClick={deleteProfilePic}
                  >
                    Delete Profile Photo
                  </Dropdown.Item>
                </DropdownButton>
              </MediaQuery>
            </div>
            <img
              src="https://ik.imagekit.io/ok2wgebfs/evento/21207-removebg-preview.png?updatedAt=1684923957895"
              alt=""
              className="profile-vector"
            />
          </div>
          <div className="profile-card-div">
            <Card />
            <Card2 />
            <Graph data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
