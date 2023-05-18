import React, { useState } from "react";
import "./login.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import MediaQuery from "react-responsive";

export default function Login() {
  const [login, setLogin] = useState("flex");
  const [forgot, setForgot] = useState("none");
  const putUserData = () => {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    // get form data and check for exist or not
    fetch("https://event-manager-api-git-main-deepraj0502.vercel.app/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["login"] === "Success") {
          window.location.href = "/globalevents";
        } else {
          document.getElementById("invalid").style.display = "block";
          document.getElementById("invalid").style.animationName = "popup";
        }
      });
  };
  const slideReg = () => {
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-primary", "15px");
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-secondary", "0px");
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-borderright", "3px solid");
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-borderleft", "0");
    document.getElementById("right-login-box").style.left = "-51%";
  };
  const slideLog = () => {
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-secondary", "15px");
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-primary", "0px");
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-borderleft", "3px solid");
    document
      .getElementById("right-login-box")
      .style.setProperty("--check-borderright", "0");
    document.getElementById("right-login-box").style.left = "-11%";
  };
  const showForgot = () => {
    setForgot("flex");
    setLogin("none");
    document.getElementById("left-box").style.transform ="rotateY(180deg)";
    document.getElementById("forgot-box").style.transform ="rotateY(180deg)";
  };
  const hideForgot = () => {
    setForgot("none");
    setLogin("flex");
    document.getElementById("left-box").style.transform ="rotateY(0deg)";
    document.getElementById("left-login-box").style.transform ="rotateY(0deg)";
  };
  const mobileReg = () =>{
    setLogin('none');
    document.getElementById('register-box').style.display="flex";
    document.getElementById('left-box').style.width="0%";
  }
  const mobileLog = () =>{
    setLogin('flex');
    document.getElementById('register-box').style.display="none";
    document.getElementById('left-box').style.width="100%";
  }
  return (
    <div className="login-outer-box">
      <div className="login-box">
        <div id="left-box">
          {/* Login Box */}
          <div
            className="left-login-box"
            id="left-login-box"
            style={{ display: login }}
          >
            <h1 className="login-wel-text">WELCOME TO</h1>
            <div style={{ display: "flex" }}>
              <img
                src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523"
                alt=""
                className="left-logo"
              />
              <img
                src="https://ik.imagekit.io/ok2wgebfs/evento/logo-name-removebg-preview.png?updatedAt=1684140911522"
                alt=""
                className="left-logo-text"
              />
            </div>
            <p className="login-para">Log in to attend your favorite events.</p>
            <form style={{ width: "100%", marginLeft: "20px" }} className="login-form">
              <div style={{ marginTop: "-10px" }}>
                <HiOutlineMail className="email-icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="Email Id"
                  className="login-input"
                  id="email"
                />
              </div>
              <div>
                <RiLockPasswordLine className="email-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="login-input"
                  id="pass"
                />
              </div>
              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  style={{ border: "none", background: "white" }}
                  onClick={showForgot}
                >
                  <p className="forgot-pass">Forgot Password ?</p>
                </button>
                <p className="invalid" id="invalid">
                  Invalid Credentials
                </p>
              </div>
              <input
                type="button"
                value="SIGN IN"
                className="signin-btn"
                onClick={putUserData}
              />
            </form>
            <p className="register-here">
              Don't have an account ?
              <MediaQuery maxWidth={600}>
            <button className="register-here-a" onClick={mobileReg}>
              {" "}
              Sign Up Now
            </button>
            </MediaQuery>
            <MediaQuery minWidth={900}>
            <button className="register-here-a" onClick={slideReg}>
              {" "}
              Sign Up Now
            </button>
            </MediaQuery>
            </p>
          </div>
          {/* Forgot Box */}
          <div
            className="left-login-box"
            id="forgot-box"
            style={{ display: forgot }}
          >
            <h1 className="login-wel-text">WELCOME TO</h1>
            <div style={{ display: "flex" }}>
              <img
                src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523"
                alt=""
                className="left-logo"
              />
              <img
                src="https://ik.imagekit.io/ok2wgebfs/evento/logo-name-removebg-preview.png?updatedAt=1684140911522"
                alt=""
                className="left-logo-text"
              />
            </div>
            <p className="login-para">Recover your password.</p>
            <form style={{ width: "100%", marginLeft: "20px" }} className="login-form">
              <div style={{ marginTop: "-10px" }}>
                <HiOutlineMail className="email-icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="Registered Email Id"
                  className="login-input"
                  id="email"
                />
              </div>
              <input
                type="button"
                value="SEND OTP"
                className="signin-btn"
                onClick={putUserData}
              />
            </form>
            <p className="register-here">
              Back To Login ?
              <button className="register-here-a" onClick={hideForgot}>
                {" "}
                Log In
              </button>
            </p>
          </div>
        </div>
        {/* Register Box */}
        <div className="register-box" id="register-box">
          <h1 className="register-wel-text">WELCOME TO</h1>
          <div style={{ display: "flex" }}>
            <img
              src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523"
              alt=""
              className="left-logo"
            />
            <img
              src="https://ik.imagekit.io/ok2wgebfs/evento/logo-name-removebg-preview.png?updatedAt=1684140911522"
              alt=""
              className="left-logo-text"
            />
          </div>
          <p className="register-para">
            Register here to attend your favorite events.
          </p>
          <form style={{ width: "100%", marginLeft: "20px" }} className="login-form">
            <div style={{ marginTop: "-10px" }}>
              <HiOutlineMail className="email-icon" />
              <input
                type="text"
                name="email"
                placeholder="Email Id"
                className="register-input"
                id="email"
              />
            </div>
            <div>
              <RiLockPasswordLine className="email-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="register-input"
                id="pass"
              />
            </div>
            <input
              type="button"
              value="SIGN UP"
              className="signin-btn"
              onClick={putUserData}
            />
          </form>
          <p className="register-here">
            Already have an account ?
            <MediaQuery maxWidth={600}>
            <button className="register-here-a" onClick={mobileLog}>
              {" "}
              Sign In Now
            </button>
            </MediaQuery>
            <MediaQuery minWidth={900}>
            <button className="register-here-a" onClick={slideLog}>
              {" "}
              Sign In Now
            </button>
            </MediaQuery>
          </p>
        </div>
      </div>
      <div className="right-login-box" id="right-login-box">
        <img
          src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523"
          alt=""
          className="right-logo"
        />
        <img
          src="https://ik.imagekit.io/ok2wgebfs/evento/login-logo-removebg-preview.png?updatedAt=1684140911481"
          alt=""
          className="right-logo-name"
        />
      </div>
    </div>
  );
}
