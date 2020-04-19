import React from 'react';
import { Typography, Grid } from "@material-ui/core"
import Login from '../login';
import PlayerSideBar from './playerSideBar';


const Home: React.FunctionComponent = () => {

    return(
        <div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h1">FFAuction</Typography>
                    <Login></Login>
                </Grid>
                <Grid item xs={4}>
                    <PlayerSideBar></PlayerSideBar>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Home;