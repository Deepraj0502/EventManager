import {
  collection,
  getFirestore,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { app } from "../FirebaseConfig";

export default function MobileNumber(props) {
  const db = getFirestore(app);
  const location = useLocation();
  const [mobno, setMobNo] = useState("");

  const getMobileNumber = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((dat) => {
      if (dat.data()["email"] === location.state.email) {
        setMobNo(dat.data()["mobileNo"]);
      }
    });
  };
  useEffect(() => {
    getMobileNumber();
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = async () => {
    var mobileno = document.getElementById("mob-input").value;
    var regEx = /^([0-9]{10})+$/;
    if (mobileno.length !== 10 || !regEx.test(mobileno)) {
      document.getElementById("mob-invalid").style.display = "block";
    } else {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((dat) => {
        if (dat.data()["email"] === location.state.email) {
          const scoreRef = doc(db, "users", dat.id);
          updateDoc(scoreRef, {
            mobileNo: mobileno,
          });
        }
      });
      setShow(false);
      setMobNo(mobileno);
    }
  };
  const handleShow = () => setShow(true);

  return (
    <>
      {mobno === "" && (
        <Button
          variant="primary"
          onClick={handleShow}
          className="mobile-button"
        >
          Add Mobile Number
        </Button>
      )}
      {mobno !== "" && (
        <Button
          variant="primary"
          onClick={handleShow}
          className="mobile-button"
        >
          {mobno}
        </Button>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Mobile Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="9876543210"
                id="mob-input"
                autoFocus
              />
            </Form.Group>
            <Form.Label
              id="mob-invalid"
              style={{ color: "red", display: "none", marginTop: "-10px" }}
            >
              Invalid Mobile Number
            </Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
