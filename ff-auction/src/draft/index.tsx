import React, { useEffect, useState } from 'react';
import PlayerTable from './playerTable';
import FFAppBar from '../common/appBar';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Catalogs, Catalog } from 'ordercloud-javascript-sdk';

interface RouteParams {
    leagueId?: string
}
interface DraftProps extends RouteComponentProps<RouteParams> {
    playerArray?: any[]
}

const Draft: React.FunctionComponent<DraftProps> = (props) => {
    const [league, setLeague] = useState<Catalog>();

    useEffect(() => {
        if(props.match.params.leagueId) {
            Catalogs.Get(props.match.params.leagueId).then(setLeague)
        }
    }, [props.match.params.leagueId])

    const {playerArray} = props;
    return(
        <div>
            <FFAppBar currentLeague={league?.Name}></FFAppBar>
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

export default withRouter(connect(mapStateToProps)(Draft));  