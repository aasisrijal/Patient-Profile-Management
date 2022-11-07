import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';

interface ToastProps {
    message?: string;
}

export default function SimpleSnackbar({message}: ToastProps) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {

    setOpen(false);
  };
  console.log('snack bar oopen',message)

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
