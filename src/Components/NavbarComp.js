import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidenav, Nav } from "rsuite";
import GroupIcon from "@rsuite/icons/legacy/Dashboard";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import HeartIcon from "@rsuite/icons/legacy/Heart";
import PlusSquare from "@rsuite/icons/legacy/PlusSquare";
import CertificateIcon from "@rsuite/icons/legacy/Certificate";
import ProfileIcon from "@rsuite/icons/legacy/Profile";
import LogoutIcon from "@rsuite/icons/legacy/User";
import "./NavbarComp.css";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { collection, getDocs, query, getFirestore } from "firebase/firestore";

import { app } from "./FirebaseConfig";

export default function NavbarComp(props) {
  if (window.sessionStorage.getItem("login") === false) {
    window.location.href = "/";
  }
  const db = getFirestore(app);
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home", {
      state: {
        email: location.state.email,
      },
    });
  };
  const navigateToProfile = () => {
    navigate("/profile", {
      state: {
        email: location.state.email,
      },
    });
  };
  const navigateToAddEvent = () => {
    navigate("/addevent", {
      state: {
        email: location.state.email,
      },
    });
  };
  const navigateToLikedEvents = () => {
    navigate("/likedevents", {
      state: {
        email: location.state.email,
      },
    });
  };
  const [user, setUser] = useState([]);
  const getCategory = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data()["email"] === location.state.email) {
        setUser(doc.data()["category"]);
      }
    });
  };
  useEffect(() => {
    getCategory();
  });
  return (
    <div style={{ width: 300 }}>
      <MediaQuery maxWidth={600}>
        <Sidenav expanded={expanded}>
          {expanded && (
            <Sidenav.Body style={{ animationName: "expand" }}>
              <Sidenav.Toggle
                expanded={expanded}
                onToggle={(expanded) => setExpanded(expanded)}
              />
              <Nav activeKey={props.active}>
                <Nav.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "-40px",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src="https://ik.imagekit.io/ok2wgebfs/evento/evento-removebg-preview.png?updatedAt=1703920695677"
                      alt=""
                      className="left-logo nav-logo"
                    />
                    <h1 className="evento-logo-name nav-name">EVENTO</h1>
                  </div>
                </Nav.Item>
                <Nav.Item
                  eventKey="1"
                  icon={<GroupIcon />}
                  onClick={navigateToHome}
                >
                  Dashboard
                </Nav.Item>
                <Nav.Item
                  eventKey="2"
                  icon={<ProfileIcon />}
                  onClick={navigateToProfile}
                >
                  Profile
                </Nav.Item>
                {user === "organizer" && (
                  <>
                    <Nav.Menu
                      placement="rightStart"
                      eventKey="3"
                      title="Your Events"
                      icon={<MagicIcon />}
                    >
                      <Nav.Item eventKey="3-1">Past Events</Nav.Item>
                      <Nav.Item eventKey="3-2">Future Events</Nav.Item>
                    </Nav.Menu>
                    <Nav.Item
                      eventKey="7"
                      icon={<PlusSquare />}
                      onClick={navigateToAddEvent}
                    >
                      Add Event
                    </Nav.Item>
                  </>
                )}
                <Nav.Item
                  eventKey="4"
                  icon={<HeartIcon />}
                  onClick={navigateToLikedEvents}
                >
                  Liked Events
                </Nav.Item>
                <Nav.Item eventKey="5" icon={<CertificateIcon />}>
                  Certificate
                </Nav.Item>
                <Nav.Item eventKey="6" icon={<LogoutIcon />}>
                  Logout
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          )}
          {!expanded && (
            <Sidenav.Body
              style={{
                width: "56px",
                animationName: "contrast",
                animationDuration: "0.05",
              }}
            >
              <Sidenav.Toggle
                expanded={expanded}
                onToggle={(expanded) => setExpanded(expanded)}
              />
              <Nav activeKey={props.active}>
                <Nav.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "-40px",
                      marginTop: "10px",
                    }}
                  >
                    <img
                      src="https://ik.imagekit.io/ok2wgebfs/evento/evento-removebg-preview.png?updatedAt=1703920695677"
                      alt=""
                      className="left-logo nav-logo"
                      style={{ width: "35px", height: "35px" }}
                    />
                    <h1 className="evento-logo-name nav-name">EVENTO</h1>
                  </div>
                </Nav.Item>
                <Nav.Item
                  eventKey="1"
                  icon={<GroupIcon />}
                  onClick={navigateToHome}
                >
                  Dashboard
                </Nav.Item>
                <Nav.Item
                  eventKey="2"
                  icon={<ProfileIcon />}
                  onClick={navigateToProfile}
                >
                  Profile
                </Nav.Item>
                {user === "organizer" && (
                  <>
                    <Nav.Menu
                      placement="rightStart"
                      eventKey="3"
                      title="Your Events"
                      icon={<MagicIcon />}
                    >
                      <Nav.Item eventKey="3-1">Past Events</Nav.Item>
                      <Nav.Item eventKey="3-2">Future Events</Nav.Item>
                    </Nav.Menu>
                    <Nav.Item
                      eventKey="7"
                      icon={<PlusSquare />}
                      onClick={navigateToAddEvent}
                    >
                      Add Event
                    </Nav.Item>
                  </>
                )}
                <Nav.Item
                  eventKey="4"
                  icon={<HeartIcon />}
                  onClick={navigateToLikedEvents}
                >
                  Liked Events
                </Nav.Item>
                <Nav.Item eventKey="5" icon={<CertificateIcon />}>
                  Certificate
                </Nav.Item>
                <Nav.Item eventKey="6" icon={<LogoutIcon />}>
                  Logout
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          )}
        </Sidenav>
      </MediaQuery>
      <MediaQuery minWidth={900}>
        <Sidenav expanded={true}>
          <Sidenav.Body>
            <Nav activeKey={props.active}>
              <Nav.Item>
                <div
                  style={{
                    display: "flex",
                    marginLeft: "-40px",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src="https://ik.imagekit.io/ok2wgebfs/evento/Untitled-removebg-preview.png?updatedAt=1689439801374"
                    alt=""
                    className="nav-logo"
                  />
                  <img
                    src="https://ik.imagekit.io/ok2wgebfs/evento/Untitled__2_-removebg-preview.png?updatedAt=1689439802235"
                    alt=""
                    className="nav-name"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "-40px",
                    marginTop: "10px",
                  }}
                >
                  <img
                    src="https://ik.imagekit.io/ok2wgebfs/evento/evento-removebg-preview.png?updatedAt=1703920695677"
                    alt=""
                    className="left-logo nav-logo"
                  />
                  <h1 className="evento-logo-name nav-name">EVENTO</h1>
                </div>
              </Nav.Item>
              <Nav.Item
                eventKey="1"
                icon={<GroupIcon />}
                onClick={navigateToHome}
              >
                Dashboard
              </Nav.Item>
              <Nav.Item
                eventKey="2"
                icon={<ProfileIcon />}
                onClick={navigateToProfile}
              >
                Profile
              </Nav.Item>
              {user === "organizer" && (
                <>
                  <Nav.Menu
                    placement="rightStart"
                    eventKey="3"
                    title="Your Events"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="3-1">Past Events</Nav.Item>
                    <Nav.Item eventKey="3-2">Future Events</Nav.Item>
                  </Nav.Menu>
                  <Nav.Item
                    eventKey="7"
                    icon={<PlusSquare />}
                    onClick={navigateToAddEvent}
                  >
                    Add Event
                  </Nav.Item>
                </>
              )}
              <Nav.Item
                eventKey="4"
                icon={<HeartIcon />}
                onClick={navigateToLikedEvents}
              >
                Liked Events
              </Nav.Item>
              <Nav.Item eventKey="5" icon={<CertificateIcon />}>
                Certificate
              </Nav.Item>
              <Nav.Item
                eventKey="6"
                icon={<LogoutIcon />}
                onClick={() => {
                  window.sessionStorage.setItem("login", false);
                  window.location.href = "/";
                }}
              >
                Logout
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </MediaQuery>
    </div>
  );
}
