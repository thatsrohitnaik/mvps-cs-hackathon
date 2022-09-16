import React, { useState } from 'react';
import Seat from './seat/';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

export default function Hall({ seats }) {
  const [alert, setAlertMessage] = useState(null);
  const [open, setOpen] = React.useState(true);

  const showAlert = (alert) => {
    setOpen(true);
    setAlertMessage(alert);
  };

  return (
    <div>
      {alert != null && (
        <Collapse in={open}>
          <Alert
            variant="filled"
            severity={alert.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {alert.message}
          </Alert>
        </Collapse>
      )}
      <div className="row">
        {seats.map((seat) => {
          return <Seat key={seat.seatNo} seat={seat} showAlert={showAlert} />;
        })}
      </div>
    </div>
  );
}
