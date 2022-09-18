import React, { useState } from 'react';
import './style.css';
import { getChair } from '../../../util/helper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Seat({ data, user, date, getAddToList }) {
    const { seatNo, status, allocatedTo, amendRequestBy } = data;
    const gridSize = window.innerWidth > 600 ? 'col-1 ' : 'col-3';
    const [showSelectChair, setShowSelectChair] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [toBeAllocateList, settoBeAllocateList] = React.useState(user.team.members);
    const [addedToAllocationList, setaddedToAllocationList] = React.useState([]);
    const [to, setTo] = React.useState('');

    const handleChange = (event) => {
        setTo(event.target.value);
    };

    const addToList = (seatNo, date, to) => {
        const a = addedToAllocationList;
        a.push({ seatNo, date, to  })
        setaddedToAllocationList(a);
        getAddToList(addedToAllocationList)
    }

    const removeFromToAllocationList = () => {

    }

    const uponSeatClick = () => {
        if (showSelectChair) {
            setShowSelectChair(false);
            return null;
        }
        const available = checkIfSeatIsAvailable(status);
        if (!available) {
            handleOpen();
        } else {
            setShowSelectChair(true);
            handleOpen();
        }
    };

    const checkIfSeatIsAvailable = (status) => {
        return status == 'A';
    };

    const showAllocation = () => {

        return (<>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Allocated to {allocatedTo?.person} from {allocatedTo?.team}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Contact email {allocatedTo?.email}
            </Typography>
        </>)
    }

    const allocate = () => {

        return (<>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Allocate To</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={to}
                    label="Allocate To"
                    onChange={handleChange}
                >
                    {
                        toBeAllocateList.map((t) => {
                            return <MenuItem value={t}>{t.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <br />
            <Button variant="outlined" onClick={() => {
                addToList(seatNo, date, to);
            }}>Add</Button>
        </>)
    }

    return (
        <>
            <div className={gridSize} key={seatNo}>
                <div
                    className="chair-img-div "
                    onClick={() => {
                        uponSeatClick();
                    }}
                >
                    {!showSelectChair && (
                        <img
                            src={getChair(status, allocatedTo, user?.team?.name)}
                            className="img"
                        />
                    )}
                    {showSelectChair && <img src={getChair('S')} className="img" />}
                </div>
                <p className="chair-seatno-p">{seatNo}</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Seat : {seatNo}
                    </Typography>
                    {allocatedTo != null && showAllocation()}
                    <br />
                    {allocatedTo == null && allocate()}
                </Box>
            </Modal>
        </>
    );
}
