import React from "react";
import './login.css';
import {HiOutlineMail} from 'react-icons/hi'
import {RiLockPasswordLine} from 'react-icons/ri'


export default function Login() {
  const putUserData = () => {
    var email=document.getElementById('email').value;
    var pass=document.getElementById('pass').value;
    // get form data and check for exist or not
    fetch("https://event-manager-api-git-main-deepraj0502.vercel.app/login", {
      method: 'POST',
      body: JSON.stringify({
        "email":email,
        "password":pass
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if(data['login']==="Success"){
        window.location.href="/globalevents";
      }
      else{
        document.getElementById('invalid').style.display="block";
        document.getElementById('invalid').style.animationName="popup";
      }
    });
    
  }
  return (
    <div className="login-outer-box">
      <div className="login-box">
        <div className="left-login-box">
          <h1 className="login-wel-text">WELCOME TO</h1>
          <div style={{display:"flex"}}>
          <img src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523" alt="" className="left-logo"/>
          <img src="https://ik.imagekit.io/ok2wgebfs/evento/logo-name-removebg-preview.png?updatedAt=1684140911522" alt="" className="left-logo-text"/>
          </div>
          <p className="login-para">Log in to attend your favorite events.</p>
          <form style={{width:"100%",marginLeft:"20px"}}>
            
            <div style={{marginTop:"-10px"}}>
              <HiOutlineMail className="email-icon"/>
            <input type="text" name="email" placeholder="Email Id" className="login-input" id="email"/>
            </div>
            <div>
              <RiLockPasswordLine className="email-icon"/>
            <input type="password" name="password" placeholder="Password" className="login-input" id="pass"/>
            </div>
            <div style={{display:"flex"}}>
            <a href="/" style={{textDecoration:"none"}}><p className="forgot-pass">Forgot Password ?</p></a>
            <p className="invalid" id="invalid">Invalid Credentials</p>
            </div>
            <input type="button"value="SIGN IN" className="signin-btn" onClick={putUserData}/>
          </form>
          <p className="register-here">Don't have an account ?<a href="/" className="register-here-a"> Sign Up Now</a></p>
        </div>
        <div className="right-login-box">
          <img src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523" alt="" className="right-logo"/>
          <img src="https://ik.imagekit.io/ok2wgebfs/evento/login-logo-removebg-preview.png?updatedAt=1684140911481" alt="" className="right-logo-name"/>
        </div>
      </div>
    </div>
  );
}
