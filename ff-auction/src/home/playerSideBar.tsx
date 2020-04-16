import React from 'react';
import { ListItemText, List, ListItem } from '@material-ui/core';

interface PlayerSideBarProps {
    playerArray?: any[]
}

const PlayerSideBar: React.FunctionComponent<
    PlayerSideBarProps> = (props) => {
        const {playerArray} = props;

    return( 
        <div>
            {playerArray && playerArray.slice(0,10) && 
            playerArray.slice(1,10).map(p => (
                <List>
                    <ListItem>
                        <ListItemText primary={p.player.fullName}>
                        </ListItemText>
                    </ListItem>
                </List>
            ))}
        </div>
    )
}

export default PlayerSideBar;