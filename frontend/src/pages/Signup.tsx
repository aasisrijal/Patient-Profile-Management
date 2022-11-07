import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";

import Input from "../components/Input/Input";
import { loginApi, signup } from "../services/api";
import toast from 'react-hot-toast';

const initialState = { email: "", password: "", confirmPassword: "" };

const Signup: React.FC<{ login: Boolean }> = (props: any) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(!props.login);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError]= useState("")

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
      if(isSignup && (form.password !== form.confirmPassword)) {
        toast.error('Passwords must be same')
        return;
      }
    const response = isSignup
      ? await signup({ email: form.email, password: form.password })
      : await loginApi({ email: form.email, password: form.password });

    console.log('login res',response)
    if(response.status==="error"){
      setApiError(response.message)
      toast.error(response.message)
    } else if(response.statusCode === 200 && !isSignup){
      navigate("/", { replace: true});
    } else {
      toast.success(response.message);
      switchMode();
    }
  };
  const switchMode = () => {
    setForm({ email: "", password:"", confirmPassword:""});
    setIsSignup((prevIsSignup: boolean) => !prevIsSignup);
    setShowPassword(false);
    setApiError("");
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
              value={form.email}
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              value={form.password}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                value={form.confirmPassword}
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

            {apiError && <h4>{apiError}</h4>}
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
