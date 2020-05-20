import React, { useState } from 'react';
import { Category, Catalog } from 'ordercloud-javascript-sdk';
import { Button, Dialog, DialogTitle, DialogContent, Typography, TextField, IconButton, DialogActions, Grid } from '@material-ui/core';
import { DraftedPlayer } from './playerTable/draftPlayerForm';
import RemoveIcon from '@material-ui/icons/Remove';
import LoadingButton from '../common/loadingButton';

interface EditPicksProps {
    league: Catalog
    team: Category
}


const EditPicks: React.FunctionComponent<EditPicksProps> = (props) => {
    const {league, team} = props;
    const [open, setOpen] = useState<boolean>(false)

    const handleSave =  () => {
        console.log("save")
        return Promise.resolve(null)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <React.Fragment>
            <Button onClick={() => setOpen(true)}>Edit</Button>
            <Dialog open={open} maxWidth="xs" onClose={handleClose}>    
                <DialogTitle>Edit Picks</DialogTitle>
                <DialogContent> 
                    <Grid container>
                    {team.xp.Players.map((player: DraftedPlayer) => (
                    <React.Fragment key={player.id}>
                        <Grid item sm={3}>
                            <IconButton>
                                <RemoveIcon color="error"/> 
                            </IconButton>
                        </Grid>
                        <Grid item sm={6}>
                            <Typography variant="body1" style={{paddingTop: '10px', paddingBottom: '10px'}}>{player.fullName}</Typography>
                        </Grid>
                        <Grid item sm={3}>
                            <TextField type="number" style={{padding: '6px 0px 7px'}}></TextField>
                        </Grid>
                    </React.Fragment>
                    ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button> 
                    <LoadingButton text="save" loading={false} onClick={handleSave}></LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default EditPicks;