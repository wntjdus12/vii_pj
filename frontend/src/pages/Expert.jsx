import React from 'react';
import "../App.css";
import Sub from '../component/Sub'
import Grid from '@mui/material/Grid';
import Exmain from '../ex_component/Exmain';



function Expert(props) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={2}>
                    <Sub/>
                </Grid>
                <Grid size={10}>
                    <Exmain/>  
                </Grid>
                
            </Grid>
        </div>
    );
}

export default Expert;