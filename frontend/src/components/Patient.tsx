import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

import { PatientData } from "../types";
import { Button } from "@mui/material";
import AlertModal from "./Modal";
import { convertDate } from "../utils";

interface PatientProps {
  patients: PatientData[];
  updatePatientsList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Patient: React.FC<PatientProps> = (props: PatientProps) => {
  const navigate = useNavigate();
  const [deleteRow, setDeleteRow] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<PatientData | undefined>();

  const updatePatients = React.useCallback(
    (val:boolean) => {
      props.updatePatientsList(val);
    },
    [props.updatePatientsList],
  )
  

  const deleteHandler = (index: PatientData) => {
    // open confirm modal
    setDeleteRow(true);
    setSelectedPatient(index)
  };
  const updateHandler = (patient: any) => {
    navigate("/create", { replace: true, state: patient });
  };
  return (
    <><AlertModal isOpen={deleteRow} setIsOpen={setDeleteRow} patient={selectedPatient!} updatePatients={updatePatients}/>
    <TableContainer component={Paper} style={{ margin: "5px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Dob</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.patients.map((patient: PatientData) => (
            <TableRow
              key={patient.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                <Avatar alt="image" src={patient.image_url} />
              </TableCell>
              <TableCell align="right">{patient.full_name}</TableCell>
              <TableCell align="right">{patient.email}</TableCell>
              <TableCell align="right">{patient.contact}</TableCell>
              <TableCell align="right">{convertDate(patient.dob)}</TableCell>
              <TableCell align="right">
                <Button onClick={(e) => deleteHandler(patient)}>Delete</Button>
                <Button onClick={(e) => updateHandler(patient)}>Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></>
  );
};
