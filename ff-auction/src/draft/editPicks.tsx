import React, { useState } from 'react';
import { Category, Catalog } from 'ordercloud-javascript-sdk';
import { Button, Dialog, DialogTitle, DialogContent, Typography, TextField, IconButton, DialogActions } from '@material-ui/core';
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

    return(
        <React.Fragment>
            <Button onClick={() => setOpen(false)}>Edit</Button>
            <Dialog open={open}>
                <DialogTitle>Edit Picks</DialogTitle>
                <DialogContent>
                    {team.xp.Players.map((player: DraftedPlayer) => (
                        <div>
                            <Typography variant="body1">{player.fullName}</Typography>
                            <TextField type="number"></TextField>
                            <IconButton>
                                <RemoveIcon />
                            </IconButton>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button>Cancel</Button>
                    <LoadingButton text="save" loading={false} onClick={handleSave}></LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default EditPicks;