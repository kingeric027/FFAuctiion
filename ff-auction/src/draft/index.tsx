import React, { useEffect, useState } from 'react';
import PlayerTable from './playerTable';
import FFAppBar from '../common/appBar';
import TeamBar from './teamBar';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Catalogs, Catalog, Categories, Category } from 'ordercloud-javascript-sdk';

interface RouteParams {
    leagueId?: string
}
interface DraftProps extends RouteComponentProps<RouteParams> {
    playerArray?: any[]
}

const Draft: React.FunctionComponent<DraftProps> = (props) => {
    const [league, setLeague] = useState<Catalog>();
    const [teams, setTeams] = useState<Category[]>();

    useEffect(() => {
        if(props.match.params.leagueId) {
            Catalogs.Get(props.match.params.leagueId).then(setLeague)
            Categories.List(props.match.params.leagueId).then((cats) => setTeams(cats.Items))
        }
    }, [props.match.params.leagueId])

    const {playerArray} = props;
    return(
        <div>
            <FFAppBar currentLeague={league?.Name}></FFAppBar>
            {teams && 
            <TeamBar teamList={teams}></TeamBar>}
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