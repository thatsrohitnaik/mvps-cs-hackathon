import Alert from '@mui/material/Alert';
import React from 'react';

export default function Alertf({ severity, message }) {
  return <Alert severity={severity}>{message}</Alert>;
}
