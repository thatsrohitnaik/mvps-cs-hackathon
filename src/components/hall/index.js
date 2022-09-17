import React from 'react';
import Seat from './Seat/';
import { StoreContext } from '../../context/index';

export default function Hall({ floor, zone, user }) {
    const { store } = React.useContext(StoreContext);
    const [seatData, setSeatData] = React.useState([]);
    React.useEffect(() => {
        abc();
    }, [])

    const abc = async () => {
        const a = await store.getSpaceAllocationData();
        setSeatData(a);
    };
    if (seatData.length == 0) {
        return null;
    }
    return (
        <div className='row'>
            {seatData.seats.map((i) => {
                console.log(i,"lll")
                return <Seat key={i.seatNo} data={i} floor={floor} zone={zone} user={user}/>
            })}
        </div>)
}