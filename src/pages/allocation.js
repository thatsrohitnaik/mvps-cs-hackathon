import Hall from '../components/hall/';
import * as React from 'react';
import Box from '@mui/material/Box';
import Nav from '../components/nav';
import BuildingForm from '../components/building-form';

export default function Allocation() {
  const [seats, setSeats] = React.useState(null);
  const uponSeatAllocationData = (data) => {
    console.log(data, 'helo');
  //  setSeats(data);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav />
      <br />
      <div className="container">
        <BuildingForm uponSeatAllocationData={uponSeatAllocationData} />
        <br />
        {seats && <Hall seats={seats} />}
      </div>
    </Box>
  );
}
