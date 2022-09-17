import React from 'react';
import { building } from '../../mock-data/building';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

let floor = ['a', 'b'];

export default function BuildingForm() {
  const [value, setFloorValue] = React.useState(floor[0]);
  const [inputFloorValue, setinputFloorValue] = React.useState('');
  const gridSize = window.innerWidth > 600 ? 'col-3' : 'col-12';

  const splitBuildingData = () => {
    const a = building.map((b) => {
      return b.floor;
    });
    floor = a;
    console.log(floor);
  };
  splitBuildingData();

  return (
    <div className="row">
      <div className={gridSize}>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setFloorValue(newValue);
          }}
          inputFloorValue={inputFloorValue}
          onInputChange={(event, newinputFloorValue) => {
            setinputFloorValue(newinputFloorValue);
          }}
          id="controllable-states-demo"
          options={floor}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Floor" />}
        />
        <br />
      </div>
      <div className={gridSize}>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setFloorValue(newValue);
          }}
          inputFloorValue={inputFloorValue}
          onInputChange={(event, newinputFloorValue) => {
            setinputFloorValue(newinputFloorValue);
          }}
          options={floor}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Wing" />}
        />
        <br />
      </div>
    </div>
  );
}
