import Hall from '../components/hall/';
import { seats } from '../mock-data/seats.js';
import * as React from 'react';
import Box from '@mui/material/Box';
import Nav from '../components/nav';
import BuildingForm from '../components/building-form';

export default function Allocation() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav />
      <br />
      <div className="container">
        <BuildingForm />
        <br />
        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputFloorValue: '${inputFloorValue}'`}</div> */}

        <Hall seats={seats} />
      </div>
    </Box>
  );
}
