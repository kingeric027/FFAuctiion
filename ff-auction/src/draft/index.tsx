import React, { useEffect, useState, useCallback } from 'react';
import PlayerTable from './playerTable';
import FFAppBar from '../common/appBar';
import TeamList from './teamList';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Catalogs, Catalog, Categories, Category } from 'ordercloud-javascript-sdk';
import { Grid, Button } from '@material-ui/core';
import Roster from './roster';
import { flatten } from 'lodash';
import { PlayerData } from '../App';
import TableToolBar from './TableToolBar';
import { DraftedPlayer } from './playerTable/draftPlayerForm';
import PlayerView from './playerView';

export interface RouteParams {
    leagueId?: string
}
interface DraftProps extends RouteComponentProps<RouteParams> {
    playerArray?: PlayerData[]
}

const updateAvailablePlayers = (draftedPlayers: any, allPlayers?: any[]) => (
    allPlayers ? allPlayers.filter(player => (
        !draftedPlayers.find((dp:any) => (dp.id === player.id))
    )) : []
)

const Draft: React.FunctionComponent<DraftProps> = (props) => {
    const [league, setLeague] = useState<Catalog>();
    const [teams, setTeams] = useState<Category[]>();
    const [selectedTeam, setSelectedTeam] = useState<Category>();
    const [availablePlayers, setAvailablePlayers] = useState<PlayerData[]>();
    const [draftedPlayers, setDraftedPlayers] = useState<DraftedPlayer[]>()
    const [tableData, setTableData] = useState<PlayerData[]>()
    const [showAll, setShowAll] = useState<boolean>(false);
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerData>();

    useEffect(() => {
        if(props.match.params.leagueId) {
            Catalogs.Get(props.match.params.leagueId).then(setLeague)
            Categories.List(props.match.params.leagueId).then((cats) => {
                setTeams(cats.Items);
                const draftedPlayers = flatten(cats.Items.map(cat => cat.xp.Players));
                const availables = updateAvailablePlayers(draftedPlayers, props.playerArray)
                setTableData(availables)
                setAvailablePlayers(availables)
                setDraftedPlayers(draftedPlayers)
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
            const newAvailablePlayers = updateAvailablePlayers(draftedPlayers, props.playerArray)
            if(!showAll) setTableData(newAvailablePlayers)
            setAvailablePlayers(newAvailablePlayers)
            setDraftedPlayers(draftedPlayers)
        }
    }

    const handleSelectedTeamChange = (team: Category) => {
        setSelectedTeam(team)
    }

    const handleShowAllChange = (checked: boolean) => {
        setShowAll(checked)
        checked ? setTableData(props.playerArray) : setTableData(availablePlayers)   
    }

    const handleSearchChange = (searchTerm: string) => {
        const dataToSearch = showAll ? props.playerArray : availablePlayers;
        const searchResults = dataToSearch?.filter(
            (player: PlayerData) => player.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setTableData(searchResults)
    }

    const handlePositionFilterChange = (filter: string) => {
        const dataToSearch = showAll ? props.playerArray : availablePlayers;
        filter === "All" ? setTableData(dataToSearch) : setTableData(dataToSearch?.filter(p=> p.position === filter))
    }

    const handlePlayerClick = (player: PlayerData) => {
        setSelectedPlayer(player) 
    }

    const teamListHeight = '130px';
    const appBarHeight = '40px';
    const toolBarHeight = '48px';
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
                    {tableData &&
                    <React.Fragment>
                        <TableToolBar 
                            handleShowSelectedChange={handleShowAllChange} 
                            checked={showAll} 
                            handleSearchChange={handleSearchChange}
                            handlePositionFilterChange={handlePositionFilterChange}>
                        </TableToolBar>
                        <PlayerTable
                        playerArray={tableData} 
                        draftedPlayers={draftedPlayers}
                        teams={teams || []} 
                        league={league}
                        handleTeamUpdate={handleTeamUpdate}
                        handlePlayerClick={handlePlayerClick}
                        selectedPlayer={selectedPlayer}
                        height={`calc(100vh - ${appBarHeight} - ${teamListHeight} - ${toolBarHeight})`}
                        >
                    </PlayerTable>
                    </React.Fragment>
                    }
                </Grid>
                <Grid item md={4}>
                    {selectedTeam && league &&
                        <Roster team={selectedTeam} league={league} handleTeamUpdate={handleTeamUpdate}></Roster>
                    }
                    {selectedPlayer && 
                    <div style={{position: 'absolute', bottom: '10px'}}>
                        <PlayerView player={selectedPlayer}></PlayerView>
                    </div>
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