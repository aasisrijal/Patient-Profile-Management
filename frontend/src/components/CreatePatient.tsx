import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Checkbox,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { createPatient, updatePatient } from "../services/api";
import Input from "./Input/Input";
import FileUpload from "./FileUpload";
import { PatientFormData } from "../types";

const initialFormValues = {
  email: "",
  full_name: "",
  contact: "",
  dob: "",
  is_special: true,
  image_url: "",
};

const CreatePatient: React.FC = (props) => {
  const location = useLocation();
  const [patient, setPatient] = useState<PatientFormData>(initialFormValues);
  const [fileError, setFileError] = useState("");
  const willUpdatePatient = location.state ? true : false;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
    if (e.target.name === "is_special") {
      setPatient({ ...patient, [e.target.name]: e.target.checked });
    }
  };

  const onSucessFile = (file: File) => {
    console.log("file", file);
    setFileError("");
  };

  const onErrorFile = (message: string) => {
    console.log("file fail", message);
    setFileError(message);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    willUpdatePatient ? updatePatient(patient) : createPatient(patient);
  };

  useEffect(() => {
    if (willUpdatePatient) {
      let date = new Date(location.state.dob);
      setPatient({ ...location.state, dob: date.toISOString().split("T")[0] });
    } else {
      setPatient(initialFormValues);
    }
  }, [location.state]);

  return (
    <Container component="main" maxWidth="sm">
      <Paper className="paper" elevation={6}>
        <Typography component="h1" variant="h5">
          {willUpdatePatient ? "Update Patient" : "Create a Patient"}
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid container>
            <Input
              name="full_name"
              label="Full Name"
              value={patient.full_name}
              handleChange={handleInputChange}
              type="text"
            />
            <Input
              name="email"
              label="Email Address"
              value={patient.email}
              handleChange={handleInputChange}
              type="email"
            />
            <Input
              name="contact"
              label="Contact Number"
              value={patient.contact}
              handleChange={handleInputChange}
              type="number"
            />
            <Input
              name="dob"
              label="Date of Birth"
              value={patient.dob}
              handleChange={handleInputChange}
              type="date"
            />
            <Grid item sm={12} margin={1}>
              <Checkbox
                name="is_special"
                checked={patient.is_special}
                onChange={handleInputChange}
              />
              <span>Is Patient Special?</span>
            </Grid>

            <FileUpload
              buttonText="Upload image"
              fileTypes={["png", "jpeg"]}
              onError={onErrorFile}
              onSuccess={onSucessFile}
              imageUrlLink={patient.image_url}
            />
            {fileError && <Typography>{fileError}</Typography>}
          </Grid>
          <Grid padding={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              {willUpdatePatient ? "Update Patient" : "Create Patient"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePatient;
