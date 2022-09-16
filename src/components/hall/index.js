import React from 'react';
import Seat from './seat/';

export default function Hall({ seats }) {
  return (
    <div>
      <div className="row">
        {seats.map((seat) => {
          return <Seat key={seat.seatNo} seat={seat} />;
        })}
      </div>
    </div>
  );
}
