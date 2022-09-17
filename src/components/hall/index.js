import React, { useState } from 'react';
import Seat from './seat/';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

export default function Hall({ seats }) {
  const [alert, setAlertMessage] = useState(null);
  const [open, setOpen] = React.useState(true);

  const showAlert = (alert) => {
    setOpen(true);
    setAlertMessage(alert);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {alert != null && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleClose}
          action={action}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      )}
      <div>
        <div className="row">
          {seats?.length &&
            seats.map((seat) => {
              return (
                <Seat key={seat.seatNo} seat={seat} showAlert={showAlert} />
              );
            })}
        </div>
      </div>
    </>
  );
}
