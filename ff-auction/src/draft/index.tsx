import React, { useEffect, useState, useCallback } from 'react';
import PlayerTable from './playerTable';
import FFAppBar from '../common/appBar';
import TeamList from './teamList';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Catalogs, Catalog, Categories, Category } from 'ordercloud-javascript-sdk';
import { Grid } from '@material-ui/core';
import Roster from './roster';
import { flatten } from 'lodash';
import { PlayerData } from '../App';

interface RouteParams {
    leagueId?: string
}
interface DraftProps extends RouteComponentProps<RouteParams> {
    playerArray?: PlayerData[]
}

const updateAvailablePlayers = (allPlayers:any[], draftedPlayers: any) => (
    allPlayers.filter(player => (
        !draftedPlayers.find((dp:any) => (dp.id === player.id))
    ))
)

const Draft: React.FunctionComponent<DraftProps> = (props) => {
    const [league, setLeague] = useState<Catalog>();
    const [teams, setTeams] = useState<Category[]>();
    const [selectedTeam, setSelectedTeam] = useState<Category>();
    const [availablePlayers, setAvailablePlayers] = useState<any[]>();

    useEffect(() => {
        if(props.match.params.leagueId) {
            Catalogs.Get(props.match.params.leagueId).then(setLeague)
            Categories.List(props.match.params.leagueId).then((cats) => {
                setTeams(cats.Items);
                const draftedPlayers = flatten(cats.Items.map(cat => cat.xp.Players));
                if(props.playerArray) setAvailablePlayers(updateAvailablePlayers(props.playerArray, draftedPlayers))
            })
        }
    }, [props.match.params.leagueId, props.playerArray]) 

    const handleTeamUpdate = (newTeam: Category) => {
        const newTeamsArray = teams?.map(team => (
            team.ID === newTeam.ID ? newTeam : team
        ))
        setTeams(newTeamsArray);
        if(!selectedTeam || selectedTeam.ID === newTeam.ID) setSelectedTeam(newTeam)
        if(props.playerArray) {
            const draftedPlayers = flatten(newTeamsArray?.map(team => team.xp.Players)); 
            const newAvailablePlayers = updateAvailablePlayers(props.playerArray, draftedPlayers)
            setAvailablePlayers(newAvailablePlayers)
        }
    }

    const handleSelectedTeamChange = (team: Category) => {
        setSelectedTeam(team)
    }

    const teamListHeight = '130px';
    const appBarHeight = '40px'
    return(
        <div>
            <FFAppBar currentLeague={league?.Name} height={appBarHeight}></FFAppBar>
            {teams && league &&
            <TeamList 
                onSelectedTeamChange={handleSelectedTeamChange} 
                teams={teams} 
                league={league} 
                height={teamListHeight}
                selectedTeam={selectedTeam}
            ></TeamList>}
            <Grid container>
                <Grid item md={8}>
                    {availablePlayers &&
                    <PlayerTable
                        playerArray={availablePlayers} 
                        teams={teams || []} 
                        league={league}
                        handleTeamUpdate={handleTeamUpdate}
                        height={`calc(100vh - ${appBarHeight} - ${teamListHeight})`}>
                    </PlayerTable>}
                </Grid>
                <Grid item md={4}>
                    {selectedTeam && league &&
                        <Roster team={selectedTeam} league={league} handleTeamUpdate={handleTeamUpdate}></Roster>
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