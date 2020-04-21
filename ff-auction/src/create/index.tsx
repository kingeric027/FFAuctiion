import React, { useState, useEffect } from 'react';
import { UserGroup, AdminUserGroups, User, AdminUsers } from 'ordercloud-javascript-sdk';
//import * as OrderCloud from  'ordercloud-javascript-sdk';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import TeamNameInput from './teamNameInput';

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
    console.log(tempArray);
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

    const handleChange = (key: LeagueKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const val  = ["RosterSize", "AuctionBudget"].includes(key) ? 
            parseInt(event.target.value) : event.target.value;
        setLeague({
            ...league,
            [key]: val
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
        const userGroup: UserGroup = {
            Name: league.Name,
            Description: currentUser.Username,
            xp: {
                RosterSize: league.RosterSize,
                AuctionBudget: league.AuctionBudget,
                Teams: league.Teams
            }
        }
        return AdminUserGroups.Create(userGroup)
        .then((group) => AdminUserGroups.SaveUserAssignment(
            {
                UserGroupID: group.ID,
                UserID: currentUser.ID
            }
        )
        .then(() => {
            const leagueArray = [  ...currentUser?.xp?.LeaguesOwned, group.ID]
            return AdminUsers.Patch(currentUser.ID!, {
                xp: {
                    LeaguesOwned: leagueArray
                }
            })
        })
        )
    }

    return (
        <form>
            <TextField 
                id="Name" 
                label="League Name" 
                value={league.Name}
                onChange={handleChange("Name")}
                required>
            </TextField>
            <TextField 
                id="TeamNumber" 
                label="Number of Teams" 
                value={league.Teams.length} 
                type="number"
                onChange={handleTeamNumberChange}
                required>
                </TextField>
            <TextField 
                id="RosterSize" 
                label="Roster Size" 
                value={league.RosterSize} 
                type="number"
                onChange={handleChange("RosterSize")}
                ></TextField>
            <TextField 
                id="AuctionBudget" 
                label="Auction Budget" 
                value={league.AuctionBudget} 
                type="number"
                onChange={handleChange("AuctionBudget")}
                required
                ></TextField>
                <TeamNameInput teams={league.Teams}></TeamNameInput>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </form>
    )
}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.user
    }
}

export default connect(mapStateToProps)(CreateLeague);