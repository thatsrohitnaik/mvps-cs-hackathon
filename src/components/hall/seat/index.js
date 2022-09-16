import React from 'react';
import './style.css';

export default function Seat(props) {
  const { seatNo, status, allocatedTo, amendRequestBy } = props.seat;
  const width = window.innerWidth;
  const gridSize = width > 600 ? 'col-1' : 'col-2';
  return <div className={gridSize}>{seatNo}</div>;
}
