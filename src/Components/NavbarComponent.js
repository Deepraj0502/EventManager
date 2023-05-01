//Navbar Component
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavbarComponent.css";

export default function NavbarComponent() {
  const [email,setEmail]=useState("");
  //fetch email id for navbar display
  fetch("http://127.0.0.1:8000/getmail")
    .then((response) => response.json())
    .then((data) => {
      setEmail(data['email']);
    });
    const img="https://ui-avatars.com/api/?name="+email+"&background=d2691e&color=ffffff";
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand className="nav-name">EventManager</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex" style={{marginRight:"auto"}}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{width:"40vw"}}
              />
              <Button variant="outline-success" style={{backgroundColor:"chocolate",color:"white",border:"0"}}>Search</Button>
            </Form>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px",float:"right",display:"flex" }}
              navbarScroll
            >
              <Nav.Link href="/globalevents" className="navbar-tab">Global Events</Nav.Link>
              <Nav.Link href="/yourevents" className="navbar-tab">Your Events</Nav.Link>
              <Nav.Link href="/liked" className="navbar-tab">Likes</Nav.Link>
              <Nav.Link href="/addevent" className="navbar-tab">Add Event</Nav.Link>
              <Nav.Link href="#" disabled style={{color:"black",fontWeight:"700"}}>
                <img src={img} alt="" className="nav-user-logo"/>
                {email}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
