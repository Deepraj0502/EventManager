import React, { useState } from "react";
import "./login.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import MediaQuery from "react-responsive";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import ReactLoading from "react-loading"; 

export default function Login() {
  const [login, setLogin] = useState("flex");
  const [forgot, setForgot] = useState("none");
  const [loading,setLoading] = useState(false);
  const [regloading,setRegLoading] = useState(false);
  const navigate = useNavigate();
  const navigateToHome = (email,name) => {
    navigate("/home", {
      state: {
        email: email
      },
    });
  };
  const navigateToNext = (name, email, password) => {
    navigate("/type", {
      state: {
        name: name,
        email: email,
        password: password,
      },
    });
  };
  const putUserData = () => {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    if (email === "" || pass === "") {
      document.getElementById("invalid").style.display = "block";
      document.getElementById("invalid").innerHTML = "Enter Credentials";
      document.getElementById("invalid").style.animationName = "popup";
      return;
    }
    setLoading(true);
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
          navigateToHome(email);
        } else {
          document.getElementById("invalid").style.display = "block";
          document.getElementById("invalid").innerHTML = "Invalid Credentials";
          document.getElementById("invalid").style.animationName = "popup";
          setLoading(false);
        }
      });
  };
  const putRegData = () => {
    var name = document.getElementById("rname").value;
    var email = document.getElementById("remail").value;
    var pass = document.getElementById("rpass").value;
    var cpass = document.getElementById("rcpass").value;
    if (name === "" || email === "" || pass === "" || cpass === "") {
      document.getElementById("reginvalid").style.display = "block";
      document.getElementById("reginvalid").innerHTML = "Enter Credentials";
      document.getElementById("reginvalid").style.animationName = "popup";
      return;
    } else if (pass !== cpass) {
      document.getElementById("reginvalid").style.display = "block";
      document.getElementById("reginvalid").innerHTML = "Password Don't Match";
      document.getElementById("reginvalid").style.animationName = "popup";
      return;
    }
    setRegLoading(true);
    fetch("https://event-manager-api-git-main-deepraj0502.vercel.app/check", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["found"] === "true") {
          document.getElementById("reginvalid").style.display = "block";
          document.getElementById("reginvalid").innerHTML =
            "Email Id Already Registered";
          document.getElementById("reginvalid").style.animationName = "popup";
          setRegLoading(false);
        } else {
          navigateToNext(name, email, pass);
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
    document.getElementById("left-box").style.transform = "rotateY(180deg)";
    document.getElementById("forgot-box").style.transform = "rotateY(180deg)";
  };
  const hideForgot = () => {
    setForgot("none");
    setLogin("flex");
    document.getElementById("left-box").style.transform = "rotateY(0deg)";
    document.getElementById("left-login-box").style.transform = "rotateY(0deg)";
  };
  const mobileReg = () => {
    document.getElementById("register-box").style.display = "flex";
    document.getElementById("left-box").style.display = "none";
    document.getElementById("left-box").style.width = "0%";
  };
  const mobileLog = () => {
    document.getElementById("left-box").style.display = "flex";
    document.getElementById("register-box").style.display = "none";
    document.getElementById("left-box").style.width = "100%";
  };
  const googleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      document.getElementById("login-loading").style.display = "block";
      // get form data and check for exist or not
      fetch("https://event-manager-api-git-main-deepraj0502.vercel.app/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.user.email,
          password: data.user.uid
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res["login"] === "Success") {
            navigateToHome(data.user.email);
          } else {
            document.getElementById("invalid").style.display = "block";
            document.getElementById("invalid").innerHTML =
              "Invalid Credentials";
            document.getElementById("invalid").style.animationName = "popup";
            document.getElementById("login-loading").style.display = "none";
          }
        });
    });
  };
  const googleReg = () => {
    signInWithPopup(auth, provider).then((data) => {
      document.getElementById("reg-loading").style.display = "block";
      // get form data and check for exist or not
      fetch("https://event-manager-api-git-main-deepraj0502.vercel.app/check", {
      method: "POST",
      body: JSON.stringify({
        email: data.user.email
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res["found"] === "true") {
          document.getElementById("reginvalid").style.display = "block";
          document.getElementById("reginvalid").innerHTML =
            "Email Id Already Registered";
          document.getElementById("reginvalid").style.animationName = "popup";
          document.getElementById("reg-loading").style.display = "none";
        } else {
          navigateToNext(data.user.displayName, data.user.email, data.user.uid);
        }
      });
    });
  };
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
            <form
              style={{ width: "100%", marginLeft: "20px" }}
              className="login-form"
            >
              <div style={{ marginTop: "30px" }}>
                <HiOutlineMail className="email-icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="Email Id"
                  className="login-input"
                  id="email"
                  required
                />
              </div>
              <div style={{ marginTop: "60px" }}>
                <RiLockPasswordLine className="email-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="login-input"
                  id="pass"
                  required
                />
              </div>
              <div style={{ display: "flex", marginTop: "5px" }}>
                <button
                  type="button"
                  style={{ border: "none", background: "white" }}
                  onClick={showForgot}
                >
                  <p className="forgot-pass">Forgot Password ?</p>
                </button>
                <p className="invalid" id="invalid"></p>
              </div>
              <button
                type="button"
                className="signin-btn"
                onClick={putUserData}
              >
                {!loading && <p>SIGN IN</p> }
                {loading && <ReactLoading type="bars" color="white" height={30} width={50} className="login-btn-loading"/> }
              </button>
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
            <p className="or">OR</p>
            <div className="google-button-outer" onClick={googleLogin}>
              <div className="google-logo-div">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAABCFBMVEX////qQzU0qFNChfT7vAU5gfSUuPmLsPji7P1QjfX7ugDqQTPpOio/g/T7uAAopUv+9fTpNCL97OrtY1j61tPsXlP2uLTvcWfwhX373933v7vylY/8zl/+8M/81nT//fP957H+7sf8yVP/+eX7wy3u9P7V4vz8zlH95ab8wiHt9/DS6tlVtG2AxZHc7+Gl1rH0q6b0o57rTUD4zMjxjYbwenDsV0r3oxvwd0ryhz72nDP5ti7tYUH6txz0lEPqQT3we2L94ZPG1/upxfl2pfdonPbrwiuMwHPZwDytuEKQzJ98tVRksVXLv0Kat0tpvH663sNUprVNrH9MrnRVmd9Yo79YrJ9WndEIFgGUAAAES0lEQVRogb2XbWPaNhSFZdmQ2JYR5iVASNKlDWwBO1AIybZ260pLX+hW021d//8/qWwM2JZkSQZ2PmLzcHJ079UNAAJVG+OWxlT9eaMq+nauGt26jWw23Eaoed8oSq6etVxkc9AR3kZu/ayI/dpY43lO+5+Ma6rs8YMrgY7wxL0S+rwpi47x8tnX7mUCSQppXUn2VMn2xnxLKvnn6ui1+XMhutpWjWRrHonOtdYsyg6jyQ++00RF0USolddQtYe92PW8M+1M9mPn+q7vl0luLbaOlwm4d3O/bZMZGMlmDcr8TMBZXg0Srjapz9rdbnvWnGgo+67Ad0fjssnUfuiedxLvnncnbpIvYIMmj00GdntK/c3V6UxDO3b+hXHGCxy57Q77K41ZPIRQM983LxTbnXHQoab1EC/yDdrsKrS1ce7XqmTwi/IGDfY1jLQc22uNXUEmvPZBM4n5PxW9c/04YfWF3N0i0oXx288UHdUPgQaXBtEvr9J4W3ROkrqqhPRfU9HYqPCiltITy4j04uWrRChqew5XP8RwEvy2lVDrMGxwtYEbxu9x8La4wOX0xNjBjceHiI5k9yeRritGQi9ekma13f22+p0SqYS6JTV5MOPgaRpOalLTDlOGADy7ycKNxz8OxF63Z1rWa+7bvbKCepnzXOuSCz81S/Lqg9cU3Lp5lgPXpVWagwsqcuuKH6IS/A34kYbzI1eDlwFdLJWfDgN33oJb6jgr1weCLwBdKxV+sSjBdSacXyxqzs3/HX6gWAj8iAdqHrEUdfOITURK8XjtT5roiIPrhDVyc8pFcXAxLosKP3T+PHdo+JxxzVnv3nPhvfIJRyZFJ5cFdUFbHyAc8o+U96t0XuYptVoYHyHES2V4v5RlO2YvsxRZN58gER6owss0fAHS65z17k8YwZWtMyIvh5/vcrH+ghvdqbHnjGLphw82K7R1+3nLxoEafEHBHb0XPoiXf+v2E9wJr5SMU4nrpbfrR+t/Wz7AlLBCOfboxMMWinQZV2Aa7slXzAlt3HFO44cXFeMzzAp7smxGKHppsXl6HVdghh7Iee8z5so2FaIAM+CS9DkjcNJBve0LQyYcYolyn7N8h+N2J59Nh1BQkYMTJlvXky/dcdgQ+3nmh94XsXEAVjzrGC95+CE5Kvz3glGHZi/9psfzTpL3GQ01WAUwNIT/+ZeiZ4znBBO595arhP/BcOSTDze//TUTzabzZYKJ+RB6/pLIDzy4Ja+f/WcmzTulUwrOr5jEL4RifJ4KngolEruVZITht200ZF1haVCcDuEX3aF6M02Hxelx8MzA45Lx9qB7pCYdvc9j70mHXx1nzmeTZPagk2hy2YQurkgu2xNfjSNWKcuwpfaRYaFoZBcpEo0qHosmf0IrRfPYV9ouRwp4HKju3IMRlAqHzOOV8lJMtAqEeIx9pcUvqbulx+eTJ8GoiOmtyK0TcOD+SlDY3wGC4X6rr+buFQAAAABJRU5ErkJggg=="
                  alt=""
                  className="google-logo"
                />
              </div>
              <div className="google-text-outer">
                <MediaQuery minWidth={1250}>
                  <p className="google-text">Log in with Google</p>
                </MediaQuery>
                <MediaQuery maxWidth={1250}>
                  <p className="google-text">Log in</p>
                </MediaQuery>
              </div>
            </div>
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
            <form
              style={{ width: "100%", marginLeft: "20px" }}
              className="login-form"
            >
              <div style={{ marginTop: "30px" }}>
                <HiOutlineMail className="email-icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="Registered Email Id"
                  className="login-input"
                  id="email"
                  required
                />
              </div>
              <button
                type="button"
                className="signin-btn"
                onClick={putUserData}
              >
                <p>Send OTP</p>
              </button>
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
          <form
            style={{ width: "100%", marginLeft: "20px" }}
            className="login-form"
          >
            <div style={{ marginTop: "30px" }}>
              <BiUser className="reg-email-icon" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="register-input"
                id="rname"
                required
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <HiOutlineMail className="reg-email-icon" />
              <input
                type="text"
                name="email"
                placeholder="Email Id"
                className="register-input"
                id="remail"
                required
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <RiLockPasswordLine className="reg-email-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="register-input"
                id="rpass"
                required
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <RiLockPasswordLine className="reg-email-icon" />
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                className="register-input"
                id="rcpass"
                required
              />
            </div>
            <p
              className="invalid"
              id="reginvalid"
              style={{ marginTop: "-12px", textAlign: "left" }}
            ></p>
            <button
              type="button"
              className="signin-btn"
              onClick={putRegData}
              style={{ marginTop: "10px" }}
            >
              {!regloading && <p>SIGN UP</p> }
              {regloading && <ReactLoading type="bars" color="white" height={30} width={50} className="login-btn-loading"/> }
            </button>
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
          <p className="or">OR</p>
          <div className="google-button-outer" onClick={googleReg}>
            <div className="google-logo-div">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAABCFBMVEX////qQzU0qFNChfT7vAU5gfSUuPmLsPji7P1QjfX7ugDqQTPpOio/g/T7uAAopUv+9fTpNCL97OrtY1j61tPsXlP2uLTvcWfwhX373933v7vylY/8zl/+8M/81nT//fP957H+7sf8yVP/+eX7wy3u9P7V4vz8zlH95ab8wiHt9/DS6tlVtG2AxZHc7+Gl1rH0q6b0o57rTUD4zMjxjYbwenDsV0r3oxvwd0ryhz72nDP5ti7tYUH6txz0lEPqQT3we2L94ZPG1/upxfl2pfdonPbrwiuMwHPZwDytuEKQzJ98tVRksVXLv0Kat0tpvH663sNUprVNrH9MrnRVmd9Yo79YrJ9WndEIFgGUAAAES0lEQVRogb2XbWPaNhSFZdmQ2JYR5iVASNKlDWwBO1AIybZ260pLX+hW021d//8/qWwM2JZkSQZ2PmLzcHJ079UNAAJVG+OWxlT9eaMq+nauGt26jWw23Eaoed8oSq6etVxkc9AR3kZu/ayI/dpY43lO+5+Ma6rs8YMrgY7wxL0S+rwpi47x8tnX7mUCSQppXUn2VMn2xnxLKvnn6ui1+XMhutpWjWRrHonOtdYsyg6jyQ++00RF0USolddQtYe92PW8M+1M9mPn+q7vl0luLbaOlwm4d3O/bZMZGMlmDcr8TMBZXg0Srjapz9rdbnvWnGgo+67Ad0fjssnUfuiedxLvnncnbpIvYIMmj00GdntK/c3V6UxDO3b+hXHGCxy57Q77K41ZPIRQM983LxTbnXHQoab1EC/yDdrsKrS1ce7XqmTwi/IGDfY1jLQc22uNXUEmvPZBM4n5PxW9c/04YfWF3N0i0oXx288UHdUPgQaXBtEvr9J4W3ROkrqqhPRfU9HYqPCiltITy4j04uWrRChqew5XP8RwEvy2lVDrMGxwtYEbxu9x8La4wOX0xNjBjceHiI5k9yeRritGQi9ekma13f22+p0SqYS6JTV5MOPgaRpOalLTDlOGADy7ycKNxz8OxF63Z1rWa+7bvbKCepnzXOuSCz81S/Lqg9cU3Lp5lgPXpVWagwsqcuuKH6IS/A34kYbzI1eDlwFdLJWfDgN33oJb6jgr1weCLwBdKxV+sSjBdSacXyxqzs3/HX6gWAj8iAdqHrEUdfOITURK8XjtT5roiIPrhDVyc8pFcXAxLosKP3T+PHdo+JxxzVnv3nPhvfIJRyZFJ5cFdUFbHyAc8o+U96t0XuYptVoYHyHES2V4v5RlO2YvsxRZN58gER6owss0fAHS65z17k8YwZWtMyIvh5/vcrH+ghvdqbHnjGLphw82K7R1+3nLxoEafEHBHb0XPoiXf+v2E9wJr5SMU4nrpbfrR+t/Wz7AlLBCOfboxMMWinQZV2Aa7slXzAlt3HFO44cXFeMzzAp7smxGKHppsXl6HVdghh7Iee8z5so2FaIAM+CS9DkjcNJBve0LQyYcYolyn7N8h+N2J59Nh1BQkYMTJlvXky/dcdgQ+3nmh94XsXEAVjzrGC95+CE5Kvz3glGHZi/9psfzTpL3GQ01WAUwNIT/+ZeiZ4znBBO595arhP/BcOSTDze//TUTzabzZYKJ+RB6/pLIDzy4Ja+f/WcmzTulUwrOr5jEL4RifJ4KngolEruVZITht200ZF1haVCcDuEX3aF6M02Hxelx8MzA45Lx9qB7pCYdvc9j70mHXx1nzmeTZPagk2hy2YQurkgu2xNfjSNWKcuwpfaRYaFoZBcpEo0qHosmf0IrRfPYV9ouRwp4HKju3IMRlAqHzOOV8lJMtAqEeIx9pcUvqbulx+eTJ8GoiOmtyK0TcOD+SlDY3wGC4X6rr+buFQAAAABJRU5ErkJggg=="
                alt=""
                className="google-logo"
              />
            </div>
            <div className="google-text-outer">
              <MediaQuery minWidth={1250}>
                <p className="google-text">Sign in with Google</p>
              </MediaQuery>
              <MediaQuery maxWidth={1250}>
                <p className="google-text">Sign in</p>
              </MediaQuery>
            </div>
          </div>
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
