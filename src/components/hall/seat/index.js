import React, { useState } from 'react';
import './style.css';
import { getChair } from '../../../util/helper';

export default function Seat(props) {
  const { seatNo, status, allocatedTo, amendRequestBy } = props.seat;
  const gridSize = window.innerWidth > 600 ? 'col-2' : 'col-4';
  const [showSelectChair, setShowSelectChair] = useState(false);

  const selectChairIfUserIsAllowedTo = () => {

    
  };

  return (
    <div className={gridSize}>
      <div className="chair-img-div" onClick="()=>{}">
        {!showSelectChair && <img src={getChair(status)} className="img" />}
        {showSelectChair && <img src={getChair('S')} className="img" />}
      </div>
      <p className="chair-seatno-p">{seatNo}</p>
    </div>
  );
}
