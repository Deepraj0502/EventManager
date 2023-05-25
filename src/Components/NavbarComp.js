import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidenav, Nav } from "rsuite";
import GroupIcon from "@rsuite/icons/legacy/Dashboard";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import HeartIcon from '@rsuite/icons/legacy/Heart';
import CertificateIcon from '@rsuite/icons/legacy/Certificate';
import ProfileIcon from '@rsuite/icons/legacy/Profile';
import LogoutIcon from '@rsuite/icons/legacy/User';
import "./NavbarComp.css";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router-dom";

export default function NavbarComp(props) {
    const [expanded, setExpanded] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home", {
      state: {
        email: location.state.email
      },
    });
  };
  const navigateToProfile = () => {
    navigate("/profile", {
      state: {
        email: location.state.email
      },
    });
  };
    return (
      <div style={{ width: 300 }}>
        <MediaQuery maxWidth={600}>
          <Sidenav expanded={expanded}>
            {expanded && (
              <Sidenav.Body style={{ animationName: "expand"}}>
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
                        src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523"
                        alt=""
                        className="nav-logo"
                      />
                      <img
                        src="https://ik.imagekit.io/ok2wgebfs/evento/logo-name-removebg-preview.png?updatedAt=1684140911522"
                        alt=""
                        className="nav-name"
                      />
                    </div>
                  </Nav.Item>
                  <Nav.Item eventKey="1" icon={<GroupIcon />} onClick={navigateToHome}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<ProfileIcon />} onClick={navigateToProfile}>
                  Profile
                </Nav.Item>
                <Nav.Menu
                    placement="rightStart"
                    eventKey="3"
                    title="Your Events"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="3-1">Past Events</Nav.Item>
                    <Nav.Item eventKey="3-2">Future Events</Nav.Item>
                  </Nav.Menu>
                  <Nav.Item eventKey="4" icon={<HeartIcon />}>
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
              <Sidenav.Body style={{ width: "56px",animationName:"contrast",animationDuration:"0.05" }}>
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
                        src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523"
                        alt=""
                        className="nav-logo"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </div>
                  </Nav.Item>
                  <Nav.Item eventKey="1" icon={<GroupIcon />} onClick={navigateToHome}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<ProfileIcon />} onClick={navigateToProfile}>
                  Profile
                </Nav.Item>
                <Nav.Menu
                    placement="rightStart"
                    eventKey="3"
                    title="Your Events"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="3-1">Past Events</Nav.Item>
                    <Nav.Item eventKey="3-2">Future Events</Nav.Item>
                  </Nav.Menu>
                  <Nav.Item eventKey="4" icon={<HeartIcon />}>
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
            <Sidenav.Toggle
              expanded={expanded}
              onToggle={(expanded) => setExpanded(expanded)}
            />
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
                      src="https://ik.imagekit.io/ok2wgebfs/evento/logo-removebg-preview__4_.png?updatedAt=1684140911523"
                      alt=""
                      className="nav-logo"
                    />
                    <img
                      src="https://ik.imagekit.io/ok2wgebfs/evento/logo-name-removebg-preview.png?updatedAt=1684140911522"
                      alt=""
                      className="nav-name"
                    />
                  </div>
                </Nav.Item>
                <Nav.Item eventKey="1" icon={<GroupIcon />} onClick={navigateToHome}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<ProfileIcon />} onClick={navigateToProfile}>
                  Profile
                </Nav.Item>
                <Nav.Menu
                    placement="rightStart"
                    eventKey="3"
                    title="Your Events"
                    icon={<MagicIcon />}
                  >
                    <Nav.Item eventKey="3-1">Past Events</Nav.Item>
                    <Nav.Item eventKey="3-2">Future Events</Nav.Item>
                  </Nav.Menu>
                  <Nav.Item eventKey="4" icon={<HeartIcon />}>
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
          </Sidenav>
        </MediaQuery>
      </div>
    );
}
