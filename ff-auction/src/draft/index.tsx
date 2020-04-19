import React from 'react';
import PlayerTable from './playerTable';
import { connect } from 'react-redux';

interface DraftProps {
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

const mapStateToProps = (state: any) => {
    return {
        playerArray: state.players
    }
}

export default connect(mapStateToProps)(Draft);