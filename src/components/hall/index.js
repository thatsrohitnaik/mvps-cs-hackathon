import React from 'react';
import Seat from './Seat/';
import { StoreContext } from '../../context/index';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';

export default function Hall({ floor, zone, user, getAddToList }) {
    const { store } = React.useContext(StoreContext);
    const [seatData, setSeatData] = React.useState([]);
    const [alreadyAllocated, setalreadyAllocated] = React.useState([]);
    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClickSnackNew = () => { setOpenSnack(true); };

    const handleCloseSnack = (event, reason) => { if (reason === 'clickaway') { return; } setOpenSnack(false);};

    const getAddToList2 = (list) => { list != null && store.setToBeAllocatedList(list[0]); getAddToList(store.gettoBeAllocated()); }

    React.useEffect(() => { abc(); }, [])

    const filterYourSeats = (a) => {
        const ar = [];
        a.seats.map(i => { if (i?.allocatedTo?.team == user?.team?.name) { ar.push({ seatNo: i.seatNo, date: seatData.date, to: i.allocatedTo })} })
        store.setAllToBeAllocatedList(ar)
        const codes = ar.map(c => { return c.code; })
        setalreadyAllocated(codes)
        getAddToList(store.gettoBeAllocated())
    }

    const abc = async () => {
        const a = await store.getSpaceAllocationData();
        filterYourSeats(a)
        setSeatData(a);
    };

    if (seatData.length == 0) { return null;}

    const action = (
        <React.Fragment>
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

    return (
        <>
            <Snackbar open={openSnack} anchorOrigin={{ vertical:"top", horizontal:"center" }}
                autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
                    You have reached your max seat allocation limit of {user?.team?.quota} seats!
                </Alert>
            </Snackbar>
            <div className='row'>
                {seatData.seats.map((i, index) => {
                    return <Seat key={i.seatNo} handleClickSnackNew={handleClickSnackNew} endex={index} alreadyAllocated={alreadyAllocated} getAddToList={getAddToList2} data={i} date={seatData.date} floor={floor} zone={zone} user={user} />
                })}
            </div>
        </>
    )
}