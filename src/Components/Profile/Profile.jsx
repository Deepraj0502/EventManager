import "./Profile.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import NavbarComp from "../NavbarComp";
import Graph from "./Graph/Graph";
import FlippableCard from "./FlippableCard/FlippableCard";
import FlippableCard2 from "./FlippableCard/FlippableCard2";
import { FaUserCircle } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { BsTelephoneFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { storage } from "../FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MobileNumber from "./MobileNumber";

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
    console.log(e.target.files[0]);
    const imageRef = ref(storage, name);
    uploadBytes(imageRef, e.target.files[0]).then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
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
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <>
      {loading && (
        <div className="loading-background">
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/image-processing20210904-26665-unscreen.gif?updatedAt=1684985103292"
            alt=""
            style={{ position: "absolute", zIndex: "99" }}
          />
        </div>
      )}
      <NavbarComp active="2" />
      <div className="profile-outer-div">
        <div className="profile-info-div">
          {url === "" && (
            <FaUserCircle className="profile-image" id="profile-image" />
          )}
          {url !== "" && (
            <img
              src={url}
              alt=""
              className="profile-upload-image"
              id="profile-upload-image"
            />
          )}
          <div className="profile-inner-info">
            <p className="profile-name">{name}</p>
            <div style={{ display: "flex", marginTop: "-5px" }}>
              <HiMail style={{ width: "30px", height: "30px" }} />
              <p className="profile-details">{location.state.email}</p>
            </div>
            <div style={{ display: "flex", marginTop: "-5px" }}>
              <BsTelephoneFill style={{ width: "30px", height: "24px" }} />
              <p className="profile-details">
                <MobileNumber />
              </p>
            </div>
            <DropdownButton id="dropdown-basic-button" title="Profile Photo">
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
          </div>
          <img
            src="https://ik.imagekit.io/ok2wgebfs/evento/21207-removebg-preview.png?updatedAt=1684923957895"
            alt=""
            className="profile-vector"
          />
        </div>
        <div className="profile-card-div">
          <FlippableCard />
          <FlippableCard2 />
          <Graph data={data} />
        </div>
      </div>
    </>
  );
}
