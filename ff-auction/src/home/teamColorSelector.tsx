import React from 'react';
import { teamData } from '../constants/appData';
import { Chip, createMuiTheme } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme } from '../redux/actions';

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>

const TeamColorSelector: React.FunctionComponent<PropsFromRedux> = (props) => {

    const handleTeamSelect = (team: any) => {
        const newTheme = createMuiTheme({
            palette: {
                primary: {
                    main: team.Colors.primary
                },
                secondary: {
                    main: team.Colors.secondary.main, 
                    light: team.Colors.secondary.light,
                    dark: team.Colors.secondary.dark
                }
            }
        })
        props.dispatch(setTheme(newTheme))
    }
    return (
        <React.Fragment>
            {Object.values(teamData.TeamNames).map((team: any) => {
                console.log(team)
                return <Chip 
                    style={{backgroundColor: team?.Colors?.primary, color: "white"}} 
                    label={team.Abv}
                    onClick={() => handleTeamSelect(team)}></Chip>
            })}
        </React.Fragment>
       
    )
}

export default connector(TeamColorSelector);