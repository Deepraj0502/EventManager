import React from "react";
import './login.css';
import {AiOutlineUser} from 'react-icons/ai'
import {FiLock} from 'react-icons/fi'
import {FaUserCircle} from 'react-icons/fa'

export default function Registration() {
  const putUserData = () => {
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var pass=document.getElementById('pass').value;
    //POST form data to user_info table
    fetch("http://127.0.0.1:8000/reg", {
      method: 'POST',
      body: JSON.stringify({
        "name":name,
        "email":email,
        "password":pass
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if(data['login']=="success"){
        window.location.href="/";
      }
      else{
        alert("Invalid Credentials");
      }
    });
    
  }
  return (
    <div className="outer-body">
      <div className="container">
        <div className="form-box"  style={{textAlign:"center"}}>
          <div className="header-form">
            <h4 className="text-primary text-center">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "110px" }}
              ></i>
            </h4>
            <div className="image"><FaUserCircle style={{width:"80px",height:"80px",margin:"auto"}}/></div>
            <h1>Registration</h1>
          </div>
          <div className="body-form">
            <form onSubmit={putUserData}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa fa-user"><AiOutlineUser/></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa fa-user"><AiOutlineUser/></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email ID"
                  id="email"
                  required
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fa fa-lock"><FiLock/></i>
                  </span>
                </div>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="pass"
                  required
                />
              </div>
              <button type="submit" className="log-button btn btn-secondary btn-block">
                REGISTER
              </button>
              <hr/>
              <a href="/">
              <p className="btn btn-secondary btn-block" style={{marginTop:"0px",width:"100%"}}>
                LOGIN
              </p>
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
