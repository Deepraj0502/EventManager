import React, { useEffect,useState } from "react";
import NavbarComp from "./NavbarComp";
import { useLocation } from "react-router-dom";
import "./EventHome.css";
import { BiTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarEventFill } from "react-icons/bs";
import OrganiserCard from './OrganiserCard';
import SimilarCard from './SimilarCard';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Button } from "rsuite";

export default function EventHome() {
  const [scrollableModal, setScrollableModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState([]);
  const location = useLocation();
  useEffect(()=>{
    fetch("http://localhost:3000/getcurrentevents", {
      method: "POST",
      body: JSON.stringify({
        eventname: location.state.eventName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvent(data);
      });
    setTimeout(() => setLoading(false), 1000);
  })
  return (
    <div>
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
      {!loading && (
        <>
       <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Register For Event</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => setScrollableModal(!scrollableModal)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
             


             
            </MDBModalBody>
            <MDBModalFooter>
              <Button onClick={() => setScrollableModal(!setScrollableModal)} className="home-form-btn" style={{background:"red",width:"100px"}}>
                Close
              </Button>
              <Button onClick={() => setScrollableModal(!setScrollableModal)} className="home-form-btn" style={{background:"#6671ff",width:"150px"}}>
                Submit
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        <NavbarComp />
        <div
          className="home-inner eventhome-inner"
          style={{
            background: "white",
            flexDirection: "column",
            borderTopRightRadius: "0px",
          }}
        >
          <div
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              borderTopLeftRadius: "30px",
            }}
            className="eventhome-outer"
          >
            <div className="eventhome-image-div" style={{background: `url(${event[0]['eventposter']})`}}></div>
            <img
              src={event[0]['eventposter']}
              alt=""
              className="eventhome-image"
            />
            <div className="eventhome-main">
              <div className="eventhome-main-left">
                <h1 style={{ fontWeight: "bold" }}>{location.state.eventName}</h1>
                <p className="eventhome-date">{event[0]['eventdate']}</p>
                {/* About Event */}
                <div className="eventhome-about-div">
                  <p className="eventhome-about-head">About Event</p>
                  <p className="eventhome-about-para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ultrices mi tempus imperdiet nulla malesuada. A cras semper
                    auctor neque vitae tempus quam pellentesque. Nulla at volutpat
                    diam ut venenatis tellus in. Ornare arcu dui vivamus arcu
                    felis. Cursus vitae congue mauris rhoncus aenean. Pharetra
                    diam sit amet nisl suscipit adipiscing bibendum.
                  </p>
                </div>
                {/* When and Where */}
                <div className="eventhome-ww-div">
                  <p className="eventhome-ww-head">When and Where</p>
                  <div className="ww-inside-div">
                    <div style={{ width: "30%", borderRight: "1px solid gray" }} className="ww-inside-left">
                      <div style={{ display: "flex" }}>
                        <BsCalendarEventFill
                          style={{
                            width: "40px",
                            height: "30px",
                            marginRight: "10px",
                            color: "#6671ff",
                            padding: "5px",
                            borderRadius: "5px",
                            background: "#f8f7fa",
                          }}
                        />
                        <p className="eventhome-ww-info">{event[0]['eventdate']}</p>
                      </div>
                      <div style={{ display: "flex", marginTop: "10px" }}>
                        <BiTimeFive
                          style={{
                            width: "40px",
                            height: "30px",
                            marginRight: "10px",
                            color: "#6671ff",
                            padding: "5px",
                            borderRadius: "5px",
                            background: "#f8f7fa",
                          }}
                        />
                        <p className="eventhome-ww-info">{event[0]['eventtime']}</p>
                      </div>
                    </div>
                    <div style={{ width: "70%" }} className="ww-inside-right">
                      <div style={{ display: "flex" }}>
                        <MdLocationOn
                          style={{
                            width: "60px",
                            height: "30px",
                            marginRight: "10px",
                            color: "#6671ff",
                            marginLeft: "30px",
                            padding: "5px",
                            borderRadius: "5px",
                            background: "#f8f7fa",
                          }}
                          className="ww-right-loc"
                        />
                        <p className="eventhome-ww-info">
                        {event[0]['eventlocation']}{" "}
                        </p>
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/${event[0]['eventlocation']}`}
                        className="show-in-map"
                        target="_blank"
                        rel="noreferrer"
                        style={{display:`${event[0]['eventlocation']==="Online"?"none":"block"}`}}
                      >
                        Show in map
                      </a>
                    </div>
                  </div>
                </div>
                {/* About Oraganiser */}
                <div className="eventhome-about-div">
                  <p className="eventhome-about-head">Organised By</p>
                  <img
                    src="https://trasol.in/wp-content/uploads/2021/12/trasol-logo-2.png"
                    alt=""
                    className="organiser-logo"
                  />
                  <p className="organiser-para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ultrices mi tempus imperdiet nulla malesuada.
                  </p>
                </div>
                {/* More Events */}
                <OrganiserCard/>
                {/* Similar Events */} 
                <p className="eventhome-about-head" style={{marginTop:"40px"}}>Similar Events</p>
                <SimilarCard/>
              </div>
              <div className="eventhome-main-right">
                <div className="eventhome-map">
                  <div
                    className="book-outer-div"
                    data-aos="fade-left"
                    data-aos-duration="8000"
                  >
                    <p className="reserve-head">RESERVE YOUR SEAT</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ultrices mi tempus imperdiet nulla malesuada.
                    </p>
                    <button type="button" className="reserve-button" onClick={()=>{setScrollableModal(!scrollableModal)}}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
