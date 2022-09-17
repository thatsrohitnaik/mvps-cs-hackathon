import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../components/TabPanel/';
import Hall from '../components/Hall/';

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

    console.log(props?.user?.buildingAccess, "rr")

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
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

                    {
                        props?.user?.buildingAccess.map((t, index) => {
                            return <Tab label={t?.floor} {...a11yProps(index, 0)} />
                        })
                    }

                </Tabs>
            </Box>

            {
                props?.user?.buildingAccess.map((t, index) => {
                    return (<TabPanel value={value} index1={index} index2={0} >
                        <Box sx={{ width: '100%', padding: 0 }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value2} onChange={handleChange2} aria-label="basic tabs example">
                                    {
                                        t?.zone?.map((k, i = index) => {
                                            return <Tab label={k} {...a11yProps(index, i + 1)} />
                                        })
                                    }
                                </Tabs>
                            </Box>
                            <TabPanel value={value2} index1={0} index2={index + 1}>
                                <Hall floor={t.floor} zone="A" user={props?.user}/>
                            </TabPanel>
                            <TabPanel value={value2} index1={1} index2={index + 1}>
                                <Hall floor={t.floor} zone="B" user={props?.user}/>
                            </TabPanel>
                            <TabPanel value={value2} index1={2} index2={index + 1}>
                                <Hall floor={t.floor} zone="C" user={props?.user}/>
                            </TabPanel>
                            <TabPanel value={value2} index1={3} index2={index + 1}>
                                <Hall floor={t.floor} zone="D" user={props?.user}/>
                            </TabPanel>
                        </Box>
                    </TabPanel>)
                })
            }
        </Box>
    );
}
