import React from 'react';
import { connect } from 'react-redux'
import { teamData } from '../constants/appData';
import { Scrollbars } from 'react-custom-scrollbars';
import { ListItemText, List, ListItem, ListItemAvatar, Avatar, makeStyles, Typography } from '@material-ui/core';

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

export type Position = "RB" | "WR" | "QB" | "TE" | "DST" | "K" | "NA";

const PlayerSideBar: React.FunctionComponent<
    PlayerSideBarProps> = (props) => {
        const classes = useStyles();
        const {playerArray} = props;

    return( 
        <div>
            <Typography variant="h6" style={{height: '30px'}}>Top 100 Players</Typography>
            <Scrollbars style={{ width: '100%', height:'calc(100vh - 45px)' }}>
            <List className={classes.list}>
            {playerArray && playerArray.slice(0,  100) && 
            playerArray.slice(0, 100).map(p => {
                var position: Position = teamData.PositionNames[p.defaultPositionId].Position;
                return(
                <ListItem className={ `${classes[position]} ${classes.listitem}` } key={p.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <p>${p.draftRanksByRankType.PPR.auctionValue}</p>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={p.fullName}
                        secondary={`${teamData.TeamNames[p.proTeamId]?.Name} | ${position}`}
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