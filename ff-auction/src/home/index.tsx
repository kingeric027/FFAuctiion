import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from "@material-ui/core"
import Login from '../login';
import PlayerSideBar from './playerSideBar';
import api from '../api';

// export interface HomeProps {
//     currentUser?: any
// }

const Home: React.FunctionComponent = () => {
    const [playerArray, setPlayerArray] = useState<any[]>()


    useEffect(() => {
        api.getPlayerList().then(res => {
            var playerList = res.data.players.sort( function(a: any, b: any) {
            if (a.player.draftRanksByRankType.PPR.auctionValue > b.player.draftRanksByRankType.PPR.auctionValue) {
                return -1;
            }
            if (b.player.draftRanksByRankType.PPR.auctionValue > a.player.draftRanksByRankType.PPR.auctionValue) {
                return 1;
            }
                return 0;
            })
            setPlayerArray(playerList);
        })
    }, [])

    return(
        <div>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h1">FFAuction</Typography>
                    <Login></Login>
                </Grid>
                <Grid item xs={4}>
                    <PlayerSideBar
                        playerArray={playerArray}
                    ></PlayerSideBar>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Home;