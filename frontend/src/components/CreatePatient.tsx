import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Checkbox,
} from "@mui/material";

import { createPatient } from "../services/api";
import Input from "./Input/Input";
import FileUpload from "./FileUpload";
interface FormData {
  email: string;
  full_name: string;
  contact: string;
  dob: string;
  is_special: boolean;
  imageFile?: File;
}

const CreatePatient: React.FC = (props) => {
  const [patient, setPatient] = useState<FormData>({
    email: "",
    full_name: "aasis",
    contact: "",
    dob: "",
    is_special: true,
    // imageFile: undefined,
  });
  const [fileError, setFileError] = useState("");

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createPatient(patient);
  };
  return (
    <Container component="main" maxWidth="sm">
      <Paper className="paper" elevation={6}>
        <Typography component="h1" variant="h5">
          Create a Patient
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
              handleChange={handleInputChange}
              type="email"
            />
            <Input
              name="contact"
              label="Contact Number"
              handleChange={handleInputChange}
              type="number"
            />
            <Input
              name="dob"
              label="Date of Birth"
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
              Create Patient
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePatient;
