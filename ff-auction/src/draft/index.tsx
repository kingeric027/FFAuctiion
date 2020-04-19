import React from 'react';
import PlayerTable from './playerTable';

export interface DraftProps {
    playerArray?: any[]
}

const Draft: React.FunctionComponent<DraftProps> = (props) => {
    const {playerArray} = props;
    return(
        <div>
            {playerArray &&
            <PlayerTable
                playerArray={playerArray}>
            </PlayerTable>}
        </div>
    )
}

export default Draft;