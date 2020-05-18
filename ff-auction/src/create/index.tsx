import React, { useState  } from 'react';
import { User, AdminUsers, Catalog, Catalogs, Categories, Category } from 'ordercloud-javascript-sdk';
//import * as OrderCloud from  'ordercloud-javascript-sdk';
import { TextField, Grid, makeStyles, Typography, InputAdornment } from '@material-ui/core';
import { connect } from 'react-redux';
import TeamNameInput from './teamNameInput';
import { useHistory } from 'react-router-dom';
import LoadingButton from '../common/loadingButton';
import { mapUserToProps } from '../redux/stateMappers';
import service from '../common/service';


const useStyles = makeStyles(() => ({
    textField: {
        maxWidth: 150,   
        margin: '10px'
    },
    leagueName: {
        margin: '10px',
        display: 'flex'
    },
    resize: {
        fontSize: 30
    }
  }));
export interface TeamObj {
    name: string,
    index: number
}

export interface LeagueShell {
    Name: string
    Description: string
    RosterSize: number
    AuctionBudget: number
    Teams: TeamObj[]
}

const  getTeamArray = (teams: number) => {
    var tempArray: TeamObj[] = [];
    for(var i=0; i<teams; i++) {
        tempArray.push({
            name: '',
            index: i
        });
    }
    return tempArray;
}

const leagueShell: LeagueShell = {
    Name: '',
    Description: '',
    RosterSize: 15,
    AuctionBudget: 200,
    Teams: getTeamArray(12)
}

export type LeagueKeys = "Name" | "Description" | "TeamNumber" | "RosterSize" | "AuctionBudget";

interface CreateLeagueProps {
    currentUser: User
}

const CreateLeague: React.FunctionComponent<CreateLeagueProps> = (props) => {
    const {currentUser} = props;
    const [league, setLeague] = useState<LeagueShell>(leagueShell);
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const classes = useStyles(0);

    const handleChange = (key: LeagueKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const val  = ["RosterSize", "AuctionBudget"].includes(key) ? 
            parseInt(event.target.value) : event.target.value;
        setLeague({
            ...league,
            [key]: val
        })
    }

    const handleTeamNameChange = (teams: TeamObj[]) => {
        setLeague({
            ...league,
            Teams: teams
        })
    }

    const handleTeamNumberChange  = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(parseInt(event.target.value) > league.Teams.length) {
            setLeague({
                ...league,
                Teams: [...league.Teams, {
                    index:  parseInt(event.target.value)-1,
                    name: ''
                }]
            })
        } else {
            var teamsCopy = [...league.Teams];
            setLeague({
                ...league,
                Teams: teamsCopy.filter(t => t.index<parseInt(event.target.value))
            })
        }
    }

    const handleSubmit = () => {
        setLoading(true)
        const leagueToCreate: Catalog = {
            Name: league.Name,
            Description: currentUser.Username,
            Active: true,
            xp: {
                RosterSize: league.RosterSize,
                AuctionBudget: league.AuctionBudget,
                Teams: league.Teams,
                Season: service.GetCurrentSeason()
            }
        };
        return Catalogs.Create(leagueToCreate).then((createdLeague) => {
            var queue: Promise<any>[] = [];
            league.Teams.forEach(team => {
                var cat: Category = {
                    Active: true,
                    Name: team.name,
                    ListOrder: team.index,
                    xp: {
                        BudgetRemaining: 200,
                        Players: []
                    }  
                }
                queue.push(
                    Categories.Create(createdLeague.ID, cat)
                )
            })
            const leaguesArray = currentUser?.xp?.LeaguesOwned ? 
            [  ...currentUser.xp.LeaguesOwned, createdLeague.ID ] : [createdLeague.ID]
            queue.push(AdminUsers.Patch(currentUser.ID!, {
                xp: {
                    LeaguesOwned: leaguesArray
                }
            }))
            return Promise.all(queue).then(() => {
                setLeague(leagueShell)
                setLoading(false);
                history.push(`/draft/${createdLeague.ID}`)
                return;
            })
        })
    }

    return (
        <form>
            <Grid container>
                <Grid item xs={6}>
                <Typography variant="h6">League Information</Typography>
                <TextField className={classes.leagueName}
                id="Name" 
                label="League Name" 
                value={league.Name}
                onChange={handleChange("Name")}
                required
                InputProps={{
                    classes: {
                        input: classes.resize
                    } 
                }}>
            </TextField>

            <TextField 
                className={classes.textField}
                id="TeamNumber" 
                label="Number of Teams" 
                value={league.Teams.length} 
                type="number"
                onChange={handleTeamNumberChange}
                required>
                </TextField>
            <TextField 
                className={classes.textField}
                id="RosterSize" 
                label="Roster Size" 
                value={league.RosterSize} 
                type="number"
                onChange={handleChange("RosterSize")}
                ></TextField>
            <TextField 
                className={classes.textField}
                id="AuctionBudget" 
                label="Auction Budget" 
                value={league.AuctionBudget} 
                type="number"
                onChange={handleChange("AuctionBudget")}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                required
                ></TextField>
                </Grid>
                <Grid item xs={6}>
                    <TeamNameInput 
                        teams={league.Teams}
                        onChange={handleTeamNameChange}></TeamNameInput>
                </Grid>
            </Grid>
                {/* <Button onClick={() => handleSubmit()}>Submit</Button> */}
                <LoadingButton
                    onClick={handleSubmit}
                    loading={loading}
                    text="Submit">
                </LoadingButton>
        </form>
    )
}

export default connect(mapUserToProps)(CreateLeague);