import React from 'react';
import { building } from '../../mock-data/building';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

let floor = [];

export default function BuildingForm() {
  const [value, setFloorValue] = React.useState(null);
  const [wing, setWingValue] = React.useState(null);
  const [wingOption, setWingOption] = React.useState(null);

  const [inputFloorValue, setinputFloorValue] = React.useState('');
  const [inputWingValue, setinputWingValue] = React.useState('');

  const gridSize = window.innerWidth > 600 ? 'col-3' : 'col-12';

  const splitBuildingData = () => {
    const a = building.map((b) => {
      return b.floor;
    });
    floor = a;
  };

  const onWingChange = (floor) => {
    let a = null;
    building.map((b) => {
      if (b.floor == floor) {
        a = b.wing;
      }
    });
    console.log(a);
    let b = [];
    a.map((a) => {
      b.push(a.name);
    });
    setWingOption(b);
  };

  splitBuildingData();

  return (
    <div className="row">
      <div className={gridSize}>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            onWingChange(newValue);
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
          value={wing}
          onChange={(event, newValue) => {
            setWingValue(newValue);
          }}
          inputFloorValue={inputWingValue}
          onInputChange={(event, newinputWingValue) => {
            setinputWingValue(newinputWingValue);
          }}
          options={wingOption}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Wing" />}
        />
        <br />
      </div>
    </div>
  );
}
