import React from 'react';
import { building } from '../../mock-data/building';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

let floor = [];

export default function BuildingForm() {
  const [value, setFloorValue] = React.useState(null);
  const [wing, setWingValue] = React.useState(null);
  const [wingOption, setWingOption] = React.useState(null);
  const [date, setDate] = React.useState(dayjs());

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const [inputFloorValue, setinputFloorValue] = React.useState('');
  const [inputWingValue, setinputWingValue] = React.useState('');

  const isMobile = window.innerWidth < 600;
  const gridSize = isMobile ? 'col-12' : 'col-3';

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
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {!isMobile && (
              <DesktopDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
            {isMobile && (
              <MobileDatePicker
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            )}
          </LocalizationProvider>
        </div>
        <br />
      </div>
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
      <div className={gridSize}>
        <Typography variant="h6" component="h6">
          Availiable 20/35
        </Typography>
        <Typography variant="h6" component="h6">
          Selected 1/12
        </Typography>
      </div>
    </div>
  );
}
