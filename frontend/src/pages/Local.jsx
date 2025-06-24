import React from 'react';
import "../App.css";
import Sub from '../component/Sub'
import Grid from '@mui/material/Grid';
import Lomain from '../lo_component/Lomain';



function Home(props) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={2}>
                    <Sub/>
                </Grid>
                <Grid size={10}>
                    <Lomain/>
                </Grid>
                
            </Grid>
        </div>
    );
}

export default Home;