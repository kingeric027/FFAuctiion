import React from 'react';
import teamNames from '../../public/assets/teamIds.json';
import { ListItemText, List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';

interface PlayerSideBarProps {
    playerArray?: any[]
}

const PlayerSideBar: React.FunctionComponent<
    PlayerSideBarProps> = (props) => {
        const {playerArray} = props;
        console.log(playerArray)
        //debugger;

    return( 
        <div>
            {playerArray && playerArray.slice(0,50) && 
            playerArray.slice(1,50).map(p => (
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <p>${p.draftRanksByRankType.PPR.auctionValue}</p>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={p.fullName}>
                        </ListItemText>
                    </ListItem>
                </List>
            ))}
        </div>
    )
}

export default PlayerSideBar;