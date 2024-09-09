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
import ReactLoading from "react-loading";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  getFirestore,
  query,
} from "firebase/firestore";
import { app } from ".././FirebaseConfig";

export default function App() {
  const db = getFirestore(app);
  const location = useLocation();
  const [name, setName] = useState("");
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    const colRef = query(collection(db, "users"));
    const querySnapshot = await getDocs(colRef);
    querySnapshot.forEach((doc) => {
      if (doc.data()["email"] === location.state.email) {
        setName(doc.data()["name"]);
        setUrl(doc.data()["profilepic"]);
      }
    });
    setLoading(false);
  };

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

  const deleteProfilePic = async () => {
    setUrl("");
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc4) => {
      if (doc4.data()["email"] === location.state.email) {
        const scoreRef = doc(db, "users", doc4.id);
        updateDoc(scoreRef, {
          profilepic: null,
        });
      }
    });
  };

  const [picUpload, setPicUpload] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // *** Validation: Check if file is an image and size is within limit ***
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      setSuccess(null);
      document.getElementById("toast-simple").style.display = "flex";
      setTimeout(() => {
        document.getElementById("toast-simple").style.display = "none";
      }, 3000);

      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2MB size limit
      setError("Image size should not exceed 2MB.");
      setSuccess(null);
      document.getElementById("toast-simple").style.display = "flex";
      setTimeout(() => {
        document.getElementById("toast-simple").style.display = "none";
      }, 3000);

      return;
    }

    try {
      setError(null); // Clear any previous errors
      setSuccess(null);
      setPicUpload(true);

      const imageRef = ref(storage, file.name);

      // Upload image to Firebase Storage
      await uploadBytes(imageRef, file);

      // Get the download URL and optimistically update the state
      const newUrl = await getDownloadURL(imageRef);
      setUrl(newUrl);

      // Fetch the user's document and update the profile picture
      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach(async (docSnapshot) => {
        if (docSnapshot.data()["email"] === location.state.email) {
          const scoreRef = doc(db, "users", docSnapshot.id);
          await updateDoc(scoreRef, {
            profilepic: newUrl,
          });
        }
      });

      setPicUpload(false);
      setSuccess("Image uploaded successfully!");
      document.getElementById("toast-simple2").style.display = "flex";
      setTimeout(() => {
        document.getElementById("toast-simple2").style.display = "none";
      }, 3000);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setError("Failed to upload image. Please try again.");
      setSuccess(null);
      setPicUpload(false);
    }
  };

  useEffect(() => {
    getInfo();
  });

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

        <div
          id="toast-simple"
          class="hidden fixed top-5 right-5 border-2 border-[#ef233c] z-[999] flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#ef233c"
            className="w-6 h-6"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
          <div class="ps-4 text-sm font-semibold text-[#ef233c]">{error}</div>
        </div>

        <div
          id="toast-simple2"
          class="hidden fixed top-5 right-5 border-2 border-[#52b788] z-[999] flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="success"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="#52b788"
            className="w-6 h-6"
          >
            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
          </svg>
          <div class="ps-4 text-sm font-semibold text-[#52b788]">{success}</div>
        </div>

        <div className="profile-inner-div">
          <div className="profile-info-div">
            <div className="user-profile-div">
              {picUpload ? (
                <div className="pic-btn-loading">
                  <ReactLoading
                    type="bars"
                    color="#6671FF"
                    height={30}
                    width={50}
                  />
                </div>
              ) : url ? (
                <img
                  src={url}
                  alt="Profile"
                  className="profile-upload-image"
                  id="profile-upload-image"
                  key={url}
                />
              ) : (
                <FaUserCircle
                  className="profile-image"
                  id="profile-image"
                  color="gray"
                />
              )}
              <MediaQuery maxWidth={600}>
                <DropdownButton id="dropdown-basic-button" title="">
                  <Dropdown.Item href="#/action-1">
                    <input type="file" onChange={handleImageChange} />
                  </Dropdown.Item>
                  {url && (
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
                  )}
                </DropdownButton>
              </MediaQuery>
            </div>
            <div className="profile-inner-info">
              <p className="profile-name">{name}</p>
              <div style={{ textAlign: "left" }}>
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
                  {url && (
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
                  )}
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
