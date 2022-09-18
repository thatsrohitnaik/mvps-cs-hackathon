import React from 'react';
import Seat from './Seat/';
import { StoreContext } from '../../context/index';

export default function Hall({ floor, zone, user, getAddToList }) {
    const { store } = React.useContext(StoreContext);
    const [seatData, setSeatData] = React.useState([]);
    const [alreadyAllocated, setalreadyAllocated] = React.useState([]);

    const getAddToList2 = (list) => {
        console.log(list)
        list != null && store.setToBeAllocatedList(list[0])
        getAddToList(store.gettoBeAllocated())
    }

    React.useEffect(() => {
        abc();
    }, [])

    const filterYourSeats = (a) => {
        const ar = [];
        a.seats.map(i => {
            console.log(i?.allocatedTo?.team, user?.team?.name )
            if (i?.allocatedTo?.team == user?.team?.name) {
                ar.push({ seatNo: i.seatNo, date: seatData.date, to: i.allocatedTo })
            }
        })

        store.setAllToBeAllocatedList(ar)
        const codes = ar.map(c=>{
            return c.code;
        })
        setalreadyAllocated(codes)
        getAddToList(store.gettoBeAllocated())
    }

    const abc = async () => {
        const a = await store.getSpaceAllocationData();
        console.log(a, "aaa")
        filterYourSeats(a)
        setSeatData(a);
    };

    if (seatData.length == 0) {
        return null;
    }
    return (
        <div className='row'>
            {seatData.seats.map((i,index) => {
                return <Seat key={i.seatNo} endex={index} alreadyAllocated={alreadyAllocated} getAddToList={getAddToList2} data={i} date={seatData.date} floor={floor} zone={zone} user={user} />
            })}
        </div>)
}