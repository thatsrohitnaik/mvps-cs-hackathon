import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TabPanel from '../components/TabPanel/';
import Hall from '../components/Hall/';
import './style.css';
import { getChair } from '../util/helper';

function a11yProps(index1, index2) {
    return {
        id: `simple-tab-${index1}-${index2}`,
        'aria-controls': `simple-tabpanel-${index1}-${index2}`,
    };
}

export default function MyAllocation(props) {
    const [value, setValue] = React.useState(0);
    const [value2, setValue2] = React.useState(0);
    const [value3, setValue3] = React.useState(0);
    const [list, setList] = React.useState([]);

    const getAddToList = (list) => {
        setList(list);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    const handleChange3 = (event, newValue) => {
        setValue3(newValue);
    };

    if (props == null) {
        return null
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

                        {
                            props?.user?.buildingAccess.map((t, index) => {
                                return <Tab key={index} label={t?.floor} {...a11yProps(index, 0)} />
                            })
                        }

                    </Tabs>
                </Box>

                {
                    props?.user?.buildingAccess.map((t, index) => {
                        return (<TabPanel key={index} value={value} index1={index} index2={0} >
                            <Box sx={{ width: '100%', padding: 0 }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value2} onChange={handleChange2} aria-label="basic tabs example">
                                        {
                                            t?.zone?.map((k, i = index) => {
                                                return <Tab key={i} label={k} {...a11yProps(index, i + 1)} />
                                            })
                                        }
                                    </Tabs>
                                </Box>
                                <TabPanel key="1" value={value2} index1={0} index2={index + 1}>
                                    <br />
                                    <Hall floor={t.floor} zone="A" user={props?.user} getAddToList={getAddToList} />
                                </TabPanel>
                                <TabPanel key="2" value={value2} index1={1} index2={index + 1} >
                                    <br />
                                    <Hall floor={t.floor} zone="B" user={props?.user} getAddToList={getAddToList} />
                                </TabPanel>
                                <TabPanel key="3" value={value2} index1={2} index2={index + 1}>
                                    <br />
                                    <Hall floor={t.floor} zone="C" user={props?.user} getAddToList={getAddToList} />
                                </TabPanel>
                                <TabPanel key="4" value={value2} index1={3} index2={index + 1}>
                                    <br />
                                    <Hall floor={t.floor} zone="D" user={props?.user} getAddToList={getAddToList} />
                                </TabPanel>
                            </Box>
                        </TabPanel>)
                    })
                }
            </Box>
            {list != null && list.map(a => {
                console.log(a, "aaaa")
                const m = a.value.seatNo + " : " + a.value.name;
                return (<Chip key={a.value.seatNo} label={m} sx={{ m: 1 }} />)
            })}
            <br />
            <div>
                <Button variant="contained" sx={{ m: 1 }}>Allocate</Button>
                <br/>
                <br/>
                <p><img src={getChair('A')} className="img-icon" />  Available  <img src={getChair('S')} className="img-icon" /> Your Team  <img src={getChair('B','A','C')} className="img-icon" /> Other Team</p>
            </div>
        </>
    );
}
