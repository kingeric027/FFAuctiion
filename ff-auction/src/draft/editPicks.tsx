import React, { useState } from 'react';
import { Category, Catalog, Categories } from 'ordercloud-javascript-sdk';
import { Button, Dialog, DialogTitle, DialogContent, Typography, TextField, IconButton, DialogActions, Grid } from '@material-ui/core';
import { DraftedPlayer } from './playerTable/draftPlayerForm';
import RemoveIcon from '@material-ui/icons/Remove';
import LoadingButton from '../common/loadingButton';
import { RosterProps } from './roster';


const EditPicks: React.FunctionComponent<RosterProps> = (props) => {
    const {league, team, handleTeamUpdate} = props;
    const [open, setOpen] = useState<boolean>(false)
    const [players, setPlayers] = useState<DraftedPlayer[]>(team.xp?.Players)
    const [loading, setLoading] = useState<boolean>(false)

    const handleClose = () => {
        setPlayers(team.xp?.Players)
        setOpen(false)
    }

    const handlePlayerUpdate = (playerId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPlayerArray = players.map((p: DraftedPlayer) => (
            p.id === playerId ? 
            { ...p,
            value: parseInt(e.target.value) } :
            p
        )); 
        setPlayers(newPlayerArray)
    }

    const handleRemovePick = (playerId: string) => {
        const newPlayerArray = players.filter((p:DraftedPlayer) => (
            p.id !== playerId
        ))
        setPlayers(newPlayerArray)
    }

    const handleSubmit = ()  => {
        return Categories.Patch(league.ID!, team.ID!, {
            xp: {
                Players: players
            }
        }).then(handleTeamUpdate)
    }

    return(
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>Edit</Button>
            <Dialog open={open} maxWidth="xs" onClose={handleClose}>    
                <DialogTitle>Edit Picks</DialogTitle>
                <DialogContent> 
                    <Grid container>
                    {players.map((player: DraftedPlayer) => (
                    <React.Fragment key={player.id}>
                        <Grid item sm={3}>
                            <IconButton>
                                <RemoveIcon color="error" onClick={() => handleRemovePick(player.id)}/> 
                            </IconButton>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="body1" style={{paddingTop: '10px', paddingBottom: '10px'}}>{player.fullName}</Typography>
                        </Grid>
                        <Grid item sm={3}>
                            <TextField type="number" style={{padding: '6px 0px 7px'}} value={player.value} onChange={handlePlayerUpdate(player.id)}></TextField>
                        </Grid>
                    </React.Fragment>
                    ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button> 
                    <LoadingButton text="save" loading={false} onClick={handleSubmit}></LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default EditPicks;