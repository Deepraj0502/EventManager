import React,{useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { BiTimeFive } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import Heart from "react-heart";
import MediaQuery from "react-responsive";

export default function SimilarCard() {
  const [active, setActive] = useState(false);
  return (
    <div>
      <MediaQuery minWidth={900}>
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
                      <BiTimeFive style={{ width: "18px", height: "22px" }} />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px" }} />
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
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " active" : ""}`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  style={{ marginTop: "-35px" }}
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
                      <BiTimeFive style={{ width: "18px", height: "22px" }} />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px" }} />
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
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " active" : ""}`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  style={{ marginTop: "-35px" }}
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
                      <BiTimeFive style={{ width: "18px", height: "22px" }} />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px" }} />
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
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " active" : ""}`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  style={{ marginTop: "-35px" }}
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
                      <BiTimeFive style={{ width: "18px", height: "22px" }} />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px" }} />
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
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " active" : ""}`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  style={{ marginTop: "-35px" }}
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
        </Carousel.Item>
      </Carousel>
      </MediaQuery>



      <MediaQuery maxWidth={600}>
      <Carousel>
        <Carousel.Item>
          <div className="home-card-outer">
            <Card sx={{ width: '98%',height:"200px",background:"linear-gradient(243deg, #4361ee, #4895ef)" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <p className="home-card-name">Money Expo India 2023</p>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div style={{ display: "flex" }}>
                      <BiTimeFive style={{ width: "18px", height: "22px" }} className="home-card-icon" />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px" }} className="home-card-icon" />
                      <p className="home-card-info">
                        Jio World Convention Centre
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <BsCalendarDate
                        style={{ width: "18px", height: "22px" }}
                        className="home-card-icon"
                      />
                      <p className="home-card-info">Sat, Aug 12</p>
                    </div>
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " customHeart-active" : ""} latest-heart`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  style={{ marginTop: "-35px" }}
                  className="home-card-btn"
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="home-card-outer">
          <Card sx={{ width: '98%',height:"200px",background:"linear-gradient(243deg, #e85d04, #f48c06)"  }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <p className="home-card-name">Money Expo India 2023</p>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div style={{ display: "flex" }}>
                      <BiTimeFive style={{ width: "18px", height: "22px",color:"white" }} />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px",color:"white" }} />
                      <p className="home-card-info">
                        Jio World Convention Centre
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <BsCalendarDate
                        style={{ width: "18px", height: "22px",color:"white" }}
                      />
                      <p className="home-card-info">Sat, Aug 12</p>
                    </div>
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " customHeart-active" : ""} latest-heart`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  className="home-card-btn"
                  style={{ marginTop: "-35px" }}
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="home-card-outer">
          <Card sx={{  width: '98%',height:"200px",background:"linear-gradient(243deg, #55a630, #80b918)"  }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <p className="home-card-name">Money Expo India 2023</p>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div style={{ display: "flex" }}>
                      <BiTimeFive style={{ width: "18px", height: "22px",color:"white" }} />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px",color:"white" }} />
                      <p className="home-card-info">
                        Jio World Convention Centre
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <BsCalendarDate
                        style={{ width: "18px", height: "22px",color:"white" }}
                      />
                      <p className="home-card-info">Sat, Aug 12</p>
                    </div>
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " customHeart-active" : ""} latest-heart`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  style={{ marginTop: "-35px" }}
                  className="home-card-btn"
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="home-card-outer">
          <Card sx={{  width: '98%',height:"200px",background:"linear-gradient(243deg, #9d4edd, #c77dff)"  }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <p className="home-card-name">Money Expo India 2023</p>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <div style={{ display: "flex" }}>
                      <BiTimeFive style={{ width: "18px", height: "22px",color:"white" }} />
                      <p className="home-card-info">10:00 AM</p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <MdLocationOn style={{ width: "18px", height: "22px",color:"white" }} />
                      <p className="home-card-info">
                        Jio World Convention Centre
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "-5px" }}>
                      <BsCalendarDate
                        style={{ width: "18px", height: "22px",color:"white" }}
                      />
                      <p className="home-card-info">Sat, Aug 12</p>
                    </div>
                    <Heart
                      isActive={active}
                      onClick={() => setActive(!active)}
                      animationScale={1.2}
                      animationTrigger="both"
                      animationDuration={0.2}
                      className={`customHeart${active ? " customHeart-active" : ""} latest-heart`}
                    />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  className="home-card-btn"
                  style={{ marginTop: "-35px" }}
                >
                  Know More
                </Button>
              </CardActions>
            </Card>
          </div>
        </Carousel.Item>
      </Carousel>
      </MediaQuery>
    </div>
  );
}
