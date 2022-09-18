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
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { StoreContext } from '../../../context/index';

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

export default function Seat({ data, user, date, getAddToList, floor, zone, endex }) {
    const { seatNo, status, allocatedTo, amendRequestBy } = data;
    const { store } = React.useContext(StoreContext);
    const gridSize = window.innerWidth > 800 ? 'col-1 ' : 'col-3';
    const [showSelectChair, setShowSelectChair] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [toBeAllocateList, settoBeAllocateList] = React.useState(user.team.members);
    const [addedToAllocationList, setaddedToAllocationList] = React.useState([]);
    const [to, setTo] = React.useState('');

    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClickSnack = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const newSeat = floor + "-" + zone + "-" + endex;


    const handleChange = (event) => {
        setTo(event.target.value);
    };

    const addToList = (seatNo, date, to) => {
        const a = addedToAllocationList;
        a.push({ seatNo: newSeat, date, to })
        setaddedToAllocationList(a);
        getAddToList(addedToAllocationList)
    }

    const removeFromToAllocationList = () => {

    }

    const uponSeatClick = () => {
        if (user.team.quota <= store.getAllocatesSize()) {
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
        // console.log(user.team.quota, store.getAllocatesSize(), "heyyyyyy")
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
            <br />
            {allocatedTo?.team != user?.team?.name && <Button variant="contained">Request Reallocation</Button>}
        </>)
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleCloseSnack}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnack}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const allocate = () => {

        return (<>
            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                message="Note archived"
                action={action}
            />
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
                        toBeAllocateList.map((t, index) => {
                            return <MenuItem key={index} value={t}>{t.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
            <br />
            <br />
            <Button variant="contained" onClick={() => {
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
                            src={getChair(status, allocatedTo?.team, user?.team?.name)}
                            className="img"
                        />
                    )}
                    {showSelectChair && <img src={getChair('S')} className="img" />}
                </div>
                <p className="chair-seatno-p">{newSeat}</p>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Seat : {newSeat}
                    </Typography>
                    {allocatedTo != null && showAllocation()}
                    <br />
                    {allocatedTo == null && allocate()}
                </Box>
            </Modal>
        </>
    );
}
