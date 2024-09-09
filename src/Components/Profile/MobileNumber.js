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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setError("Invalid Mobile Number");
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
      setSuccess("Number Updated successfully!");
      document.getElementById("toast-simple4").style.display = "flex";
      setTimeout(() => {
        document.getElementById("toast-simple4").style.display = "none";
      }, 3000);
      setMobNo(mobileno);
    }
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        id="toast-simple4"
        class="hidden fixed top-5 right-5 border-2 border-[#52b788] z-[999] flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
        role="success"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#52b788"
          className="w-6 h-6"
        >
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
        <div class="ps-4 text-sm font-semibold text-[#52b788]">{success}</div>
      </div>
      {mobno === null && (
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
              {error}
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
