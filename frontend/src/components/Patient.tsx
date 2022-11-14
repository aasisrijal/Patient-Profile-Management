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
import TablePagination from '@mui/material/TablePagination';

import { PatientData } from "../types";
import { Button, Pagination, TableFooter } from "@mui/material";
import AlertModal from "./Modal";
import { convertDate } from "../utils";

interface PatientProps {
  patients: PatientData[];
  updatePatientsList: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}

export const Patient: React.FC<PatientProps> = (props: PatientProps) => {
  const navigate = useNavigate();
  const [deleteRow, setDeleteRow] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<PatientData | undefined>();
  const [localPage, setLocalPage] = React.useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log('page no', value);
    setLocalPage(value);
    props.setPage(value);
  };

  const handleChangeRowsPerPage = (event: React.MouseEvent<HTMLButtonElement> | null, value: number) => {
    console.log('page limit', value);
    props.setLimit(value);
  };


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
    <>
    <AlertModal 
      isOpen={deleteRow} 
      setIsOpen={setDeleteRow} 
      patient={selectedPatient!} 
      updatePatients={updatePatients}
    />

    <TableContainer component={Paper} style={{ margin: "15px" }}>
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
              <TableCell align="right">
                {patient.full_name}
              </TableCell>
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
        <TableFooter>
          <TableRow>
          <Pagination count={props.totalPage} page={localPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={1}
              rowsPerPage={10}
              page={localPage}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handlePageChange}
              // onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </TableRow>
        </TableFooter>
      </Table>
        
    </TableContainer>
    </>
  );
};


