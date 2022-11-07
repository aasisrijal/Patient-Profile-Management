import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import toast from 'react-hot-toast';

import { deletePatient } from "../services/api";
import { PatientData } from "../types";

interface ModalProps {
    isOpen: boolean;
    patient: PatientData;
    setIsOpen: (val:boolean) => void;
    updatePatients: (val:boolean) => void;
}

export default function AlertModal({isOpen, setIsOpen, patient, updatePatients}: ModalProps) {

  const handleAgree = async() => {
    const delResponse = await deletePatient(patient.id);
    if (delResponse?.status === 200) {
      toast.success(delResponse?.data.message)
      updatePatients(true)
    } else {
      toast.error(delResponse?.data.message)
    }
    setIsOpen(false)
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete the patient?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}