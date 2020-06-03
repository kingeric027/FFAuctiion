import React from 'react';
import { teamData } from '../constants/appData';
import { Chip } from '@material-ui/core';

const TeamColorSelector: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            {Object.values(teamData.TeamNames).map((team: any) => {
                console.log(team)
                return <Chip style={{backgroundColor: team?.Colors?.primary, color: "white"}} label={team.Abv}></Chip>
            })}
        </React.Fragment>
       
    )
}

export default TeamColorSelector;