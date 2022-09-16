import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

export default function Alert({ severity, message }) {
  console.log(severity, message);
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    console.log('component ok updated');
  });

  return (
    <Collapse in={open}>
      <Alert
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
        {message}
      </Alert>
    </Collapse>
  );
}
