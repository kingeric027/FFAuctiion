import React from 'react';
import { PlayerData } from '../App';

interface PlayerViewProps {
    player: PlayerData
}

const PlayerView: React.FunctionComponent<PlayerViewProps> = (props) => {
    return(
    <p style={{textAlign: 'left', margin: '5px'}}>{props.player.seasonOutlook}</p>
    )
}

export default PlayerView