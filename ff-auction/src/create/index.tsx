import React, { useState } from 'react';
import { UserGroup } from 'ordercloud-javascript-sdk';
import { TextField, Button } from '@material-ui/core';

// export interface LeagueXp {
//     TeamNumber: number
//     RosterSize: number
//     AuctionBudget: number
// }


// const leagueShell: UserGroup<LeagueXp> = {
//     Name: '',
//     Description: '',
//     xp: {
//         TeamNumber: 12,
//         RosterSize: 15,
//         AuctionBudget: 200
//     }
// }

export interface LeagueShell {
    Name: string
    Description: string
    TeamNumber: number
    RosterSize: number
    AuctionBudget: number
}

const leagueShell: LeagueShell = {
    Name: '',
    Description: '',
    TeamNumber: 12,
    RosterSize: 15,
    AuctionBudget: 200
}

export type LeagueKeys = "Name" | "Description" | "TeamNumber" | "RosterSize" | "AuctionBudget";

const CreateLeague: React.FunctionComponent = () => {
    const [league, setLeague] = useState<LeagueShell>(leagueShell);

    const handleChange = (key: LeagueKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLeague({
            [key]: event.target.value,
            ...league
        })
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
                value={league.TeamNumber} 
                type="number"
                onChange={handleChange("TeamNumber")}
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
                <Button>Submit</Button>
                <Button>Cancel</Button>
        </form>
    )
}