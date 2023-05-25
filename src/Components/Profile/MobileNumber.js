import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function MobileNumber() {
    const [show, setShow] = useState(false);

    const handleClose = () =>{ 
        setShow(false);
    };
    const handleSubmit = () =>{ 
        var mobileno = document.getElementById("mob-input").value;
        var regEx = /^([0-9]{10})+$/;
        if(mobileno.length!==10 || !regEx.test(mobileno)){
            document.getElementById("mob-invalid").style.display="block";
        }
        else{
            setShow(false);
        }
    };
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow} className='mobile-button'>
         Add Mobile Number
        </Button>
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
                  id='mob-input'
                  autoFocus
                />
              </Form.Group>
              <Form.Label id='mob-invalid' style={{color:"red",display:"none",marginTop:"-10px"}}>Invalid Mobile Number</Form.Label>
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
