import React, { useEffect, useState } from 'react';
import PlayerTable from './playerTable';
import FFAppBar from '../common/appBar';
import TeamList from './teamList';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Catalogs, Catalog, Categories, Category } from 'ordercloud-javascript-sdk';
import { Grid } from '@material-ui/core';
import Roster from './roster';

interface RouteParams {
    leagueId?: string
}
interface DraftProps extends RouteComponentProps<RouteParams> {
    playerArray?: any[]
}

const Draft: React.FunctionComponent<DraftProps> = (props) => {
    const [league, setLeague] = useState<Catalog>();
    const [teams, setTeams] = useState<Category[]>();
    const [selectedTeam, setSelectedTeam] = useState<Category>();

    useEffect(() => {
        if(props.match.params.leagueId) {
            Catalogs.Get(props.match.params.leagueId).then(setLeague)
            Categories.List(props.match.params.leagueId).then((cats) => setTeams(cats.Items))
        }
    }, [props.match.params.leagueId])

    const handleTeamUpdate = (newTeam: Category) => {
        const newTeamsArray = teams?.map(team => (
            team.ID === newTeam.ID ? newTeam : team
        ))
        setTeams(newTeamsArray);
    }

    const handleSelectedTeamChange = (team: Category) => {
        setSelectedTeam(team)
    }


    const {playerArray} = props;
    return(
        <div>
            <FFAppBar currentLeague={league?.Name}></FFAppBar>
            {teams && league &&
            <TeamList onSelectedTeamChange={handleSelectedTeamChange} teams={teams} league={league}></TeamList>}
            <Grid container>
                <Grid item md={8}>
                    {playerArray &&
                    <PlayerTable
                        playerArray={playerArray}
                        teams={teams || []} 
                        league={league}
                        handleTeamUpdate={handleTeamUpdate}>
                    </PlayerTable>}
                </Grid>
                <Grid item md={4}>
                    {selectedTeam && league &&
                        <Roster team={selectedTeam} league={league}></Roster>
                    }
                </Grid>
            </Grid>
            
        </div> 
    )
}

const mapStateToProps = (state: any) => {
    return {
        playerArray: state.players
    }
}

export default withRouter(connect(mapStateToProps)(Draft));  