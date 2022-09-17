import React from 'react';
import { building } from '../../mock-data/building';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function BuildingForm({ uponSeatAllocationData, user }) {
  const [floor, setFloorValue] = React.useState(null);
  const [wing, setWingValue] = React.useState(null);
  const [date, setDate] = React.useState(dayjs());

  const [floorOption, setFloorOption] = React.useState(null);
  const [wingOption, setWingOption] = React.useState(null);

  const onWingValueChange = (event) => {
    setWingValue(event.target.value);
  };

  const onFloorChange = (event) => {
    setFloorValue(event.target.value);
    onWingChange(event.target.value);
  };

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const isMobile = window.innerWidth < 600;
  const gridSize = isMobile ? 'col-12' : 'col-3';

  const splitBuildingData = () => {
    const a = building.map((b) => {
      return b.floor;
    });
    setFloorOption(a);
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

  const getSpaceAllocationData = () => {
    uponSeatAllocationData(floor, wing, date);
  };

  const makeCall = () => {
    if (!(value?.length > 0 && wing?.length > 0 && date != null)) {
      getSpaceAllocationData();
    }
  };

  return (
    <div className="row">
      <div className={gridSize}>
        <div className="date">
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
        <FormControl fullWidth>
          <InputLabel id="floor">Floor</InputLabel>
          <Select
            labelId="Floor"
            id="demo-simple-select"
            value={wing}
            label="Floor"
            onChange={onFloorChange}
          >
            {wingOption != null &&
              wingOption.map((wing) => {
                return <MenuItem value={wing}>{wing}</MenuItem>;
              })}
          </Select>
        </FormControl>
        <br />
      </div>
      <div className={gridSize}>
        <FormControl fullWidth>
          <InputLabel id="wing">Zone</InputLabel>
          <Select
            labelId="wing"
            id="demo-simple-select"
            value={wing}
            label="Zone"
            onChange={onWingValueChange}
          >
            {wingOption != null &&
              wingOption.map((wing) => {
                return <MenuItem value={wing}>{wing}</MenuItem>;
              })}
          </Select>
        </FormControl>
        <br />
      </div>
      <div className={gridSize}>
        <Button
          onClick={() => {
            makeCall();
          }}
        >
          GET
        </Button>
      </div>
    </div>
  );
}
