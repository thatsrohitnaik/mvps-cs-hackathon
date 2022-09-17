import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export default function TabPanel(props) {
    const { children, value, index1, index2, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index1}
            id={`simple-tabpanel-${index1}-${index2}`}
            aria-labelledby={`simple-tab-${index1}-${index2}`}
            {...other}
        >
            {value === index1 && (
                <Box sx={{ p: 0 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index1: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};