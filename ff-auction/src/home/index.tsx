import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from "@material-ui/core"
import Login from '../login';
import PlayerSideBar from './playerSideBar';

export interface HomeProps {
    playerArray?: any[]
}
const Home: React.FunctionComponent<HomeProps> = (props) => {
    //const [playerArray, setPlayerArray] = useState<any[]>()

    // useEffect(() => {
    //     if(props.playerArray && props.playerArray.length) {
    //         var sortedArray = props.playerArray.sort( 
    //             function(a: any, b: any ) {
    //                 if (a.draftRanksByRankType.PPR.auctionValue > b.draftRanksByRankType.PPR.auctionValue) {
    //                     return -1;
    //                 }
    //                 if (b.draftRanksByRankType.PPR.auctionValue > a.draftRanksByRankType.PPR.auctionValue) {
    //                     return 1;
    //                 }
    //                     return 0;
    //             }
    //         );
    //         setPlayerArray(sortedArray);
    //     }
    // }, [props.playerArray])

    return(
        <div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h1">FFAuction</Typography>
                    <Login></Login>
                </Grid>
                <Grid item xs={4}>
                    <PlayerSideBar
                        playerArray={props.playerArray || []}
                    ></PlayerSideBar>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Home;