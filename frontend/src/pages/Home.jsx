import React from 'react';
import "../App.css";
import Sub from '../component/Sub'
import Grid from '@mui/material/Grid';
import Main from '../component/Main';
import Fish from '../component/Fish';
import Humidity from '../component/Humidity';


function Home(props) {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={2}>
                    <Sub/>
                </Grid>
                <Grid size={10}>
                     <Main/>  
                     <Fish/>
                     <Humidity/>
                </Grid>
                
            </Grid>
        </div>
    );
}

export default Home;