import React from 'react';
import { connect } from 'react-redux'
import { teamData } from '../constants/appData';
import { Scrollbars } from 'react-custom-scrollbars';
import { ListItemText, List, ListItem, ListItemAvatar, Avatar, makeStyles, Typography } from '@material-ui/core';
import { PlayerData } from '../App';

const useStyles = makeStyles({
    list: {
        marginRight: 10
    },
    listitem: {
        border: '1px solid grey',
        borderRadius: '10px',
        margin: '5px'
    },
    QB: {
        backgroundColor: teamData.PositionNames["1"].Color
    },
    RB: {
      backgroundColor: teamData.PositionNames["2"].Color
    },
    WR: {
        backgroundColor: teamData.PositionNames["3"].Color
    },
    TE: {
        backgroundColor: teamData.PositionNames["4"].Color
    },
    DST: {
        backgroundColor: teamData.PositionNames["5"].Color
    },
    K: {
        backgroundColor: teamData.PositionNames["5"].Color
    },
    NA: {}
  });

interface PlayerSideBarProps {
    playerArray?: any[]
}



const PlayerSideBar: React.FunctionComponent<
    PlayerSideBarProps> = (props) => {
        const classes = useStyles();
        const {playerArray} = props;

    return( 
        <div style={{ borderLeft: '1px solid black', backgroundColor: 'black'}}>
            <Typography variant="h6" style={{height: '30px', color: 'white'}}>Top 100 Players</Typography>
            <Scrollbars style={{ width: '100%', height:'calc(100vh - 100px)' }}>
            <List className={classes.list}>
            {playerArray && playerArray.slice(0,  100) && 
            playerArray.slice(0, 100).map((p: PlayerData) => {
                return(
                <ListItem className={ `${classes[p.position]} ${classes.listitem}` } key={p.id}>
                    <ListItemAvatar> 
                        <Avatar style={{backgroundColor: 'darkgreen'}}>
                            <p>${p.auctionValueAverage}</p>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={p.fullName}
                        secondary={p.teamAbv}
                    >
                    </ListItemText>
                </ListItem>
            )}
            )}
            </List>
            </Scrollbars>
            
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        playerArray: state.players
    }
}

export default connect(mapStateToProps)(PlayerSideBar);