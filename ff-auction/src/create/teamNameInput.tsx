import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Typography, TextField, Grid } from '@material-ui/core';
import { TeamObj } from '.';

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>
type TeamNameInputProps = PropsFromRedux & {
    teams: TeamObj[],
    onChange: (teams: TeamObj[]) => void
};

const TeamNameInput:  React.FunctionComponent<
TeamNameInputProps> = (props) => {
    const {teams, onChange} = props;                   

    const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        var teamsCopy = [...teams];
        var updated = teamsCopy.map((team: TeamObj) => team.index === index ? 
        {name: event.target.value, index: index} : team);
        onChange(updated)
    }

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
                        onChange={handleChange(team.index)}
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
                        onChange={handleChange(team.index)}
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
                        onChange={handleChange(team.index)}
                    ></TextField>
                    ))}
                </Grid>
            </Grid>
        </div>

    )
}

export default connector(TeamNameInput);