import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import { login, signup } from "../services/api";

const Signup: React.FC<{ login: Boolean }> = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email, password })
    props.login ? login({ email, password }) : signup({ email, password });
  };
  return (
    <div >
    <Container>
      <Form>
        <Form.Group className="col-md-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        {/* </div> */}

        <Form.Group className="col-md-6" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {props.login ? "Login" : "Signup"}
        </Button>
      </Form>
      </Container>
    </div>
  );
};

export default Signup;
