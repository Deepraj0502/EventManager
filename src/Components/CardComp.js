import React from 'react';
import Carousel from "react-bootstrap/Carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BiTimeFive} from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";

export default function CardComp() {
  return (
    <div>
      <Carousel>
            <Carousel.Item>
              <div className="home-card-outer">
                <Card sx={{ maxWidth: 340 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F444862499%2F1394200320313%2F1%2Foriginal.20230213-054456?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1200%2C600&s=5f077de2efa38fca69811aecdec575cd"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <p className="home-card-name">Money Expo India 2023</p>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <div style={{ display: "flex" }}>
                          <BiTimeFive
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">10:00 AM</p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <MdLocationOn
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">
                            Jio World Convention Centre
                          </p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <BsCalendarDate
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">Sat, Aug 12</p>
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
                      image="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F444862499%2F1394200320313%2F1%2Foriginal.20230213-054456?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1200%2C600&s=5f077de2efa38fca69811aecdec575cd"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <p className="home-card-name">Money Expo India 2023</p>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <div style={{ display: "flex" }}>
                          <BiTimeFive
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">10:00 AM</p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <MdLocationOn
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">
                            Jio World Convention Centre
                          </p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <BsCalendarDate
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">Sat, Aug 12</p>
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
            <Carousel.Item>
              <div className="home-card-outer">
                <Card sx={{ maxWidth: 340 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F444862499%2F1394200320313%2F1%2Foriginal.20230213-054456?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1200%2C600&s=5f077de2efa38fca69811aecdec575cd"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <p className="home-card-name">Money Expo India 2023</p>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <div style={{ display: "flex" }}>
                          <BiTimeFive
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">10:00 AM</p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <MdLocationOn
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">
                            Jio World Convention Centre
                          </p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <BsCalendarDate
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">Sat, Aug 12</p>
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
                      image="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F444862499%2F1394200320313%2F1%2Foriginal.20230213-054456?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C1200%2C600&s=5f077de2efa38fca69811aecdec575cd"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <p className="home-card-name">Money Expo India 2023</p>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <div style={{ display: "flex" }}>
                          <BiTimeFive
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">10:00 AM</p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <MdLocationOn
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">
                            Jio World Convention Centre
                          </p>
                        </div>
                        <div style={{ display: "flex", marginTop: "-5px" }}>
                          <BsCalendarDate
                            style={{ width: "18px", height: "22px" }}
                          />
                          <p className="home-card-info">Sat, Aug 12</p>
                        </div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      style={{ marginTop: "-15px" }}
                    >
                      Know More
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </Carousel.Item>
          </Carousel>
    </div>
  )
}