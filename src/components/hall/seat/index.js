import React, { useState } from 'react';
import './style.css';
import { getChair } from '../../../util/helper';

export default function Seat({ data, user }) {
  const { seatNo, status, allocatedTo, amendRequestBy } = data;
  const gridSize = window.innerWidth > 600 ? 'col-1 ' : 'col-3';
  const [showSelectChair, setShowSelectChair] = useState(false);

  const uponSeatClick = () => {
    if (showSelectChair) {
      setShowSelectChair(false);
      return null;
    }
    const available = checkIfSeatIsAvailable(status);
    if (!available) {
      props.showAlert({
        message: 'Seat is already booked by ' + allocatedTo,
        severity: 'error',
      });
    } else {
      setShowSelectChair(true);
    }
  };

  const checkIfSeatIsAvailable = (status) => {
    return status == 'A';
  };

  return (
    <div className={gridSize}>
      <div
        className="chair-img-div "
        onClick={() => {
          uponSeatClick();
        }}
      >
        {!showSelectChair && (
          <img
            src={getChair(status, allocatedTo, user?.team?.name)}
            className="img"
          />
        )}
        {showSelectChair && <img src={getChair('S')} className="img" />}
      </div>
      <p className="chair-seatno-p">{seatNo}</p>
    </div>
  );
}
