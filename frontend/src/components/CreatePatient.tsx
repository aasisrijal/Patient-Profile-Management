import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from 'react-bootstrap';

import { createPatient } from "../services/api";

interface FormData {
  email: string;
  full_name: string;
  contact: string;
  dob: string;
  is_special: boolean;
}

const CreatePatient: React.FC = (props) => {
  const [patient, setPatient] = useState<FormData>({
    email: "",
    full_name: "",
    contact: "",
    dob: "",
    is_special: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('patient c',patient)
    // if(e.target.checked) {console.log('checked clicedk  ')}
    // createPatient(patient);
  };
  return (

    
    <div>
      <Container>
    
      <Form >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            required
            value={patient.email}
            onChange={handleInputChange}
          />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            name="full_name"
            required
            value={patient.full_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Contact Number"
            name="contact"
            required
            value={patient.contact}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Dob"
            name="dob"
            required
            value={patient.dob}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCheckbox">
       <div className="form-group form-check">
       <label className="form-check-label">Is patient special?</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                
              </div>
      </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </Form>
      </Container>
    </div>
  );
};

export default CreatePatient;
