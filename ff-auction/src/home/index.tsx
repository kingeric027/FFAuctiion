import React from 'react';
import { Typography, Grid, Button, Tooltip } from "@material-ui/core"
import Login from '../login';
import PlayerSideBar from './playerSideBar';
import FFAppBar from '../common/appBar';
import { connect } from 'react-redux';
import { User } from 'ordercloud-javascript-sdk';
import { appData } from '../constants/appData';

interface HomeProps {
    currentUser: User
}

const Home: React.FunctionComponent<HomeProps> = (props) => {

    return(
        <div>
            <FFAppBar></FFAppBar>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h1">FFAuction</Typography>
                    <Login></Login>
                    <Tooltip title={props.currentUser.ID === appData.anon_user_id ? 
                        'You must be logged in to create a league' : ''}>
                        <Button
                            href="/create"
                            disabled={props.currentUser.ID === appData.anon_user_id}>
                                Create a League
                        </Button>
                    </Tooltip>
                </Grid>
                <Grid item xs={4}>
                    <PlayerSideBar></PlayerSideBar>
                </Grid>
            </Grid>
            
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.user
    }
}

export default connect(mapStateToProps)(Home);