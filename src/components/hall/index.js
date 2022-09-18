import React from 'react';
import Seat from './Seat/';
import { StoreContext } from '../../context/index';

export default function Hall({ floor, zone, user, getAddToList }) {
    const { store } = React.useContext(StoreContext);
    const [seatData, setSeatData] = React.useState([]);

    const getAddToList2 = (list) =>{
        console.log(list)
        list != null && store.setToBeAllocatedList(list[0])
        getAddToList(store.gettoBeAllocated())
    }

    React.useEffect(() => {
        abc();
    }, [])

    const abc = async () => {
        const a = await store.getSpaceAllocationData();
        console.log(a,"aaa")
        setSeatData(a);
    };
    if (seatData.length == 0) {
        return null;
    }
    return (
        <div className='row'>
            {seatData.seats.map((i) => {
                return <Seat key={i.seatNo} getAddToList={getAddToList2} data={i} date={seatData.date} floor={floor} zone={zone} user={user}/>
            })}
        </div>)
}