import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { PatientData } from "../types";
import { deletePatient } from "../services/api";

interface PatientProps {
  patients: PatientData[];
}

export const Patient: React.FC<PatientProps> = (props: PatientProps) => {
  const deleteHandler = (index: any, e: any) => {
    console.log(index);
    deletePatient(index.id);
  };
  return (
    <TableContainer component={Paper} style={{marginTop: "2px"}}>
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
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="right">
            <img src={patient.image_url} height="50px" width="50px" />
            </TableCell>
            <TableCell align="right">{patient.full_name}</TableCell>
            <TableCell align="right">{patient.email}</TableCell>
            <TableCell align="right">{patient.contact}</TableCell>
            <TableCell align="right">{patient.dob}</TableCell>
            <TableCell align="right">
              <button onClick={(e) => deleteHandler(patient, e)}>
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  
  );
};
