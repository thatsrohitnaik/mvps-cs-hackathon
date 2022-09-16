import React, { useState } from 'react';
import './style.css';
import { getChair } from '../../../util/helper';

export default function Seat(props) {
  const { seatNo, status, allocatedTo, amendRequestBy } = props.seat;
  const gridSize = window.innerWidth > 600 ? 'col-2' : 'col-4';
  const [showSelectChair, setShowSelectChair] = useState(false);

  const uponSeatClick = () => {
    setShowSelectChair(false);
    const available = checkIfSeatIsAvailable(status);
    if (!available) {
      props.showAlert({
        message: 'Seat is already booked by ' + allocatedTo + ' team',
        severity: 'info',
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
        className="chair-img-div"
        onClick={() => {
          uponSeatClick();
        }}
      >
        {!showSelectChair && <img src={getChair(status)} className="img" />}
        {showSelectChair && <img src={getChair('S')} className="img" />}
      </div>
      <p className="chair-seatno-p">{seatNo}</p>
    </div>
  );
}
