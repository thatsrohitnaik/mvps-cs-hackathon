import React from 'react';
import Hall from '../components/hall/';
import { seats } from '../mock-data/seats.js';

export default function Allocation() {
  return (
    <div className="container">
      <Hall seats={seats} />
    </div>
  );
}
