import React, { useState, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { User } from 'ordercloud-javascript-sdk';
import { Typography, TextField, Grid } from '@material-ui/core';
import { TeamObj } from '.';

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>
type TeamNameInputProps = PropsFromRedux & {
    teams: TeamObj[]
};

const TeamNameInput:  React.FunctionComponent<
TeamNameInputProps> = (props) => {
    const {teams} = props;                   

    // const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     var teamsCopy = [...teamArray!];
    //     var updated = teamsCopy.map((team: TeamObj) => team.index === index ? 
    //     {name: event.target.value, index: index} : team);
    //     setTeamArray(updated);
    // }

    return  (
        <div>
            <Typography variant="h6">Team Names</Typography>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    {teams.slice(0, Math.ceil(teams.length/3)).map((team: TeamObj) =>(
                        <TextField 
                        variant="outlined" 
                        key={team.index}
                        label={'Team  ' + (team.index+1)}
                        value={team.name}
                        margin="dense"
                    ></TextField>
                    ))}
                </Grid>
                <Grid item xs={4}>
                    {teams.slice(Math.ceil(teams.length/3), Math.ceil(teams.length/3) +  Math.ceil(teams.length/3))
                    .map((team:TeamObj)  => (
                        <TextField 
                        variant="outlined" 
                        key={team.index}
                        label={'Teamd  ' + (team.index+1)}
                        value={team.name}
                        margin="dense"
                        ></TextField>
                    ))}
                </Grid>
                <Grid item xs={4}>
                    {teams.slice(Math.ceil(teams.length/3) +  Math.ceil(teams.length/3), teams.length).map((team:TeamObj)  => (
                        <TextField 
                        variant="outlined" 
                        key={team.index}
                        label={'Team  ' + (team.index+1)}
                        value={team.name}
                        margin="dense"
                    ></TextField>
                    ))}
                </Grid>
            </Grid>
        </div>

    )
}

export default connector(TeamNameInput);