import React, { useState, useEffect } from 'react'
import { RouteParams } from '../draft'
import { Catalog, Category, Catalogs, Categories } from 'ordercloud-javascript-sdk';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Roster from '../draft/roster';
import FFAppBar from '../common/appBar';

const AllRosters: React.FunctionComponent<RouteComponentProps<RouteParams>> = (props) => {
    const [league, setLeague] = useState<Catalog>();
    const [teams, setTeams] = useState<Category[]>();

    useEffect(() => {
        if(props.match.params.leagueId) {
            Catalogs.Get(props.match.params.leagueId).then(setLeague)
            Categories.List(props.match.params.leagueId).then((cats) => {
                setTeams(cats.Items);
            })
        }
    }, [props.match.params.leagueId]) 

    return (
        <React.Fragment>
        <FFAppBar currentLeague={league?.Name}></FFAppBar>
        <Grid container>
            {teams && league && teams.map(team => (
                <Grid item md={3}>
                    <Roster team={team} league={league} readOnly={true}></Roster>
                </Grid>
            ))}
        </Grid>
        </React.Fragment>

    )
}



export default withRouter(AllRosters)