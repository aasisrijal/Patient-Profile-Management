import React from "react";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";

import { PatientData } from "../types";

interface PatientProps {
  patients: PatientData[];
};

export const Patient: React.FC<PatientProps> = (props: PatientProps) => {
  const deleteHandler = (patient: any) => {
    console.log(patient)
  }
  return (
    <div style={{ marginTop: "10px" }} className="patient-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Dob</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.patients.map((patient: PatientData) => {
            return (
              <tr>
            <td></td>
            <td>
              <img src={patient.image_url} height="50px" width="50px" />
            </td>
            <td>{patient.full_name}</td>
            <td>{patient.email}</td>
            <td>{patient.contact}</td>
            <td>{patient.dob}</td>
            <td>
              <button onClick={deleteHandler}>Delete</button>
            </td>
          </tr>
            )
          })}
          
        </tbody>
      </Table>
    </div>
  );
};
