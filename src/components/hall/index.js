import React, { useState } from 'react';
import Seat from './seat/';
import Alert from '../alert/';

export default function Hall({ seats }) {
  const showAlert = (alert) => {
    console.log(alert);
    setAlertMessage(null);
    setAlertMessage(alert);
  };
  const [alert, setAlertMessage] = useState(null);

  return (
    <div>
      {alert != null && (
        <Alert message={alert.message} alert={alert.severity} />
      )}
      <div className="row">
        {seats.map((seat) => {
          return <Seat key={seat.seatNo} seat={seat} showAlert={showAlert} />;
        })}
      </div>
    </div>
  );
}
