import Hall from '../components/hall/';
import * as React from 'react';
import Box from '@mui/material/Box';
import Nav from '../components/nav';
import BuildingForm from '../components/building-form';
import { StoreContext } from '../context/';

export default function Allocation() {
  const [seats, setSeats] = React.useState(null);
  const uponSeatAllocationData = async (floor, wing, date) => {
    const data = await store.getSpaceAllocationData(floor, wing, date);
    console.log(data, 'hero');
    setSeats(data.seats);
  };
  const { store } = React.useContext(StoreContext);

  const abc = async () => {
    const user = await store.getProfile();
  };

  abc();

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
