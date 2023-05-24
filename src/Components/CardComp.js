import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { events } from "./LatestEventDetails";

export default function CardComp() {
  return (
    <div>
      <Carousel>
        {events.map((data) => (
          <Carousel.Item>
            <div className="home-card-outer">
              <Card sx={{ maxWidth: 340 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data['img'][0]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <p className="home-card-name">{data['name'][0]}</p>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <div style={{ display: "flex" }}>
                        <BiTimeFive style={{ width: "18px", height: "22px" }} />
                        <p className="home-card-info">{data['time'][0]}</p>
                      </div>
                      <div style={{ display: "flex", marginTop: "-5px" }}>
                        <MdLocationOn
                          style={{ width: "18px", height: "22px" }}
                        />
                        <p className="home-card-info">
                        {data['loc'][0]}
                        </p>
                      </div>
                      <div style={{ display: "flex", marginTop: "-5px" }}>
                        <BsCalendarDate
                          style={{ width: "18px", height: "22px" }}
                        />
                        <p className="home-card-info">{data['date'][0]}</p>
                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    style={{ marginTop: "-20px" }}
                  >
                    Know More
                  </Button>
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 340 }}>
              <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data['img'][0]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <p className="home-card-name">{data['name'][0]}</p>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <div style={{ display: "flex" }}>
                        <BiTimeFive style={{ width: "18px", height: "22px" }} />
                        <p className="home-card-info">{data['time'][0]}</p>
                      </div>
                      <div style={{ display: "flex", marginTop: "-5px" }}>
                        <MdLocationOn
                          style={{ width: "18px", height: "22px" }}
                        />
                        <p className="home-card-info">
                        {data['loc'][0]}
                        </p>
                      </div>
                      <div style={{ display: "flex", marginTop: "-5px" }}>
                        <BsCalendarDate
                          style={{ width: "18px", height: "22px" }}
                        />
                        <p className="home-card-info">{data['date'][0]}</p>
                      </div>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    style={{ marginTop: "-20px" }}
                  >
                    Know More
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
