import React from 'react';

export default function Seat(props) {
  const { seatNo, status, allocatedTo, amendRequestBy } = props.seat;
  return <div className="g-col-6 g-col-md-4">{seatNo}</div>;
}
