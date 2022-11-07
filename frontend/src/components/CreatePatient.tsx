import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Checkbox,
  Snackbar,
} from "@mui/material";
import { useLocation } from "react-router-dom";

import { createPatient, updatePatient, uploadImage } from "../services/api";
import Input from "./Input/Input";
import FileUpload from "./FileUpload";
import { PatientFormData } from "../types";
import { convertDate } from "../utils";
import toast from 'react-hot-toast';

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
  const [apiResponse, setApiResponse] = useState({message: "", error: false});

  const willUpdatePatient = location.state ? true : false;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
    if (e.target.name === "is_special") {
      setPatient({ ...patient, [e.target.name]: e.target.checked });
    }
  };


  const onSucessFile = async(file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "patientMgmt");
    data.append("cloud_name", "dotjzw80a");

    const uploadResponse = await uploadImage(data);
    if(uploadResponse && uploadResponse.status === 200) {
      toast.success("Image uploaded successfully");
      setPatient({ ...patient, image_url: uploadResponse.data.secure_url });
    } else {
      toast.error("Image upload failed");
      setApiResponse({...apiResponse, error:true})
    }
    setFileError("");
  };

  const onErrorFile = (message: string) => {
    setFileError(message);
    toast.error(message);
  };

  const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = willUpdatePatient ? await updatePatient(patient) : await createPatient(patient);
    if (response?.status === 400) {
      setApiResponse({message:response?.data.message, error: true})
      toast.error(response.data.message)
    } else {
      setApiResponse({message:response?.data.message, error: false})
      toast.success(response?.data.message )
    }
  };

  useEffect(() => {
    if (willUpdatePatient) {
      let date = convertDate(location.state.dob);
      setPatient({ ...location.state, dob: date });
    } else {
      setPatient(initialFormValues);
    }
  }, [location.state]);

  return (
    <>
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
              type="text" />
            <Input
              name="email"
              label="Email Address"
              value={patient.email}
              handleChange={handleInputChange}
              type="email" />
            <Input
              name="contact"
              label="Contact Number"
              value={patient.contact}
              handleChange={handleInputChange}
              type="number" />
            <Input
              name="dob"
              label="Date of Birth"
              value={patient.dob}
              handleChange={handleInputChange}
              type="date" />
            <Grid item sm={12} margin={1}>
              <Checkbox
                name="is_special"
                checked={patient.is_special}
                onChange={handleInputChange} />
              <span>Is Patient Special?</span>
            </Grid>

            <FileUpload
              buttonText="Upload image"
              fileTypes={["png", "jpeg"]}
              onError={onErrorFile}
              onSuccess={onSucessFile}
              imageUrlLink={patient.image_url} />
            {fileError && <Typography>{fileError}</Typography>}
          </Grid>
          <Grid padding={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              disabled={apiResponse.error}
            >
              {willUpdatePatient ? "Update Patient" : "Create Patient"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default CreatePatient;
