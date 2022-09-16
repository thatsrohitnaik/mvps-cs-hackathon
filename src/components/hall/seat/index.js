import React from 'react';
import './style.css';
import { urls, getChair } from '../../../util/helper';

export default function Seat(props) {
  const { seatNo, status, allocatedTo, amendRequestBy } = props.seat;
  const gridSize = window.innerWidth > 600 ? 'col-1' : 'col-2';
  console.log(urls);

  return (
    <div className={gridSize}>
      {seatNo}
      <img
        src={(status) => {
          getChair(status);
        }}
      />
    </div>
  );
}
