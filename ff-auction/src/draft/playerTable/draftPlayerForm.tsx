import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Chip, Grid } from '@material-ui/core';
import { Category, Catalog, Categories } from 'ordercloud-javascript-sdk';
import { PlayerData } from '.';
import DownShiftInput from '../../common/downShiftInput';
import service from '../../common/service'
import LoadingButton from '../../common/loadingButton';

interface DraftPlayerFormProps {
    player: PlayerData,
    teams: Category[],
    league?: Catalog,
    handleTeamUpdate: (team: Category) => void
}
const DraftPlayerForm: React.FunctionComponent<DraftPlayerFormProps> = (props) => {
    const {player, teams, league, handleTeamUpdate} = props;
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<Category>();
    const [bid, setBid] = useState<number>();
    const [loading, setLoading] = useState<boolean>(false)

    const handleSelectionChange = (value: string | null) => {
        setSelectedTeam(teams.find(team => team.Name && team.Name === value));
    }

    const handleBidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBid(parseInt(event.target.value)) 
    }

    const handleCancel = () => {
        setLoading(false)
        setDialogOpen(false)
        setBid(undefined)
        setSelectedTeam(undefined) 
    }

    const handleSubmit = () => {
        if(selectedTeam && league && bid) {
            setLoading(true)
            const newPlayersArray = selectedTeam?.xp.Players.concat(
                {...player, 
                value: bid}
            )
            return Categories.Patch(league?.ID!, selectedTeam?.ID!, {
                xp: {
                    BudgetRemaining: (selectedTeam.xp.BudgetRemaining - bid),
                    Players: newPlayersArray
                }
            }).then(res => {
                handleTeamUpdate(res)
                handleCancel()
            }) 
        } else return Promise.reject();
        
    }

    return (
        <React.Fragment>
            <Button onClick={() => setDialogOpen(true)}>Draft</Button>
            <Dialog open={dialogOpen} onClose={()=> setDialogOpen(false)}>  
                <DialogTitle>{player.fullName + ' | ' + player.position + ' | ' + player.teamAbv}</DialogTitle> 
                <DialogContent>
                    <Grid container>
                        <Grid item sm={3}>
                            <Typography variant="subtitle1">Team:</Typography>  
                        </Grid>
                        <Grid item sm={9}>
                            {selectedTeam ? 
                                <Chip label={selectedTeam.Name} color="primary" onDelete={() => handleSelectionChange(null)}></Chip> :
                                <DownShiftInput
                                    onSelectionChange={handleSelectionChange}
                                    selectedTeam={''}
                                    teams={teams}> 
                                </DownShiftInput>
                            }
                        </Grid>
                        <Grid item sm={12}>
                            {selectedTeam && league && 
                                <div style={{textAlign: 'center', marginTop: '15px'}}>  
                                <Typography variant="overline" display="inline"> 
                                    {"Max bid: $" + service.GetMaxBid(selectedTeam, league)}
                                </Typography>
                            </div>
                            }
                            
                        </Grid>
                        <Grid item sm={3}>
                            <Typography variant="subtitle1">Amount: </Typography> 
                        </Grid>
                        <Grid item sm={9}>
                        <TextField 
                            type="number" 
                            disabled={!selectedTeam} 
                            value={bid} 
                            onChange={handleBidChange} 
                            //style={{maxWidth: '100px'}}
                        ></TextField> 
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <LoadingButton onClick={handleSubmit} loading={loading} text="Submit"></LoadingButton>
                    {/* <Button type="submit" disabled={!bid || !selectedTeam}>Submit</Button>  */}
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    )
}

export default DraftPlayerForm;