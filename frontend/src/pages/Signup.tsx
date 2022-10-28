import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Input from "../components/Input/Input";
// import * from '../components/Input/input.css'
import { loginApi, signup } from "../services/api";

const initialState = { email: "", password: "" };

const Signup: React.FC<{ login: Boolean }> = (props: any) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(!props.login);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("form", isSignup, form);
    // console.log({ email, password })
    isSignup
      ? signup(form)
      : loginApi({ email: form.email, password: form.password });
  };
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup: boolean) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container component="main" maxWidth="sm">
      <Paper className="paper" elevation={6}>
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container>
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Grid margin={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </Grid>
          <Grid margin={1}>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
