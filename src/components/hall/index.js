import React, { useState } from 'react';
import Seat from './seat/';
import Alertf from '../alert/';

export default function Hall({ seats }) {
  const showAlert = (alert) => {
    setAlertMessage(alert);
  };
  const [alertMessage, setAlertMessage] = useState(null);

  return (
    <div>
      <Alert message={alert.message} severity={alert.severity} />
      {alertMessage != null && <p>{alertMessage}</p>}
      <div className="row">
        {seats.map((seat) => {
          return <Seat key={seat.seatNo} seat={seat} showAlert={showAlert} />;
        })}
      </div>
    </div>
  );
}
