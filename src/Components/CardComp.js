import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import Heart from "react-heart";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardComp() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [events, setEvents] = useState([]);
  const [likes, setLikes] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const navigateToEventHome = (name) => {
    navigate("/eventhome", {
      state: {
        email: location.state.email,
        eventName: name,
      },
    });
  };
  useEffect(() => {
    fetch("http://localhost:3000/getevents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      });

    fetch("http://localhost:3000/getlikes", {
      method: "POST",
      body: JSON.stringify({
        email: location.state.email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response2) => response2.json())
      .then((data2) => {
        setLikes(data2);
      });
  }, [location.state.email]);

  const addlike = (name, date, time, loc) => {
    fetch("http://localhost:3000/setlike", {
      method: "POST",
      body: JSON.stringify({
        email: location.state.email,
        eventdate: date,
        eventname: name,
        eventtime: time,
        eventlocation: loc,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    likes.push({ eventname: name });
  };

  const deletelike = (name) => {
    fetch("http://localhost:3000/deletelike", {
      method: "POST",
      body: JSON.stringify({
        email: location.state.email,
        eventname: name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    likes.find((item, index) => {
      if (item.eventname === name) {
        console.log(index);
        likes.splice(index, 1);
      }
      return 0;
    });
  };
  return (
    <div>
      <Carousel responsive={responsive}>
        {events
          .filter((item, index) => index < 6)
          .map((val) => {
            return (
              <>
                <div className="home-card-outer">
                  <Card sx={{ width: 340, height: 450 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={val["eventposter"]}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <p className="home-card-name">{val["eventname"]}</p>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <div style={{ display: "flex" }}>
                            <BiTimeFive
                              style={{ width: "18px", height: "22px" }}
                            />
                            <p className="home-card-info">{val["eventtime"]}</p>
                          </div>
                          <div style={{ display: "flex", marginTop: "-5px" }}>
                            <MdLocationOn
                              style={{ width: "18px", height: "22px" }}
                            />
                            <p className="home-card-info">
                              {val["eventlocation"]}
                            </p>
                          </div>
                          <div style={{ display: "flex", marginTop: "-5px" }}>
                            <BsCalendarDate
                              style={{ width: "18px", height: "22px" }}
                            />
                            <p className="home-card-info">{val["eventdate"]}</p>
                          </div>
                        </Typography>
                      </CardContent>
                      <Heart
                        animationScale={1.2}
                        animationTrigger="both"
                        animationDuration={0.2}
                        className={`customHeart ${
                          likes.some(
                            (item) => item.eventname === val["eventname"]
                          )
                            ? "customHeart-active"
                            : ""
                        }`}
                        onClick={() => {
                          if (
                            likes.some(
                              (item) => item.eventname === val["eventname"]
                            )
                          ) {
                            deletelike(val["eventname"]);
                          } else {
                            addlike(
                              val["eventname"],
                              val["eventdate"],
                              val["eventtime"],
                              val["eventlocation"]
                            );
                          }
                        }}
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        style={{ marginTop: "-35px" }}
                        onClick={() => {
                          navigateToEventHome(val["eventname"]);
                        }}
                      >
                        Know More
                      </Button>
                    </CardActions>
                  </Card>
                </div>
              </>
            );
          })}
      </Carousel>
    </div>
  );
}
