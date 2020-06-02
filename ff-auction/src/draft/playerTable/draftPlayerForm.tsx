import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Chip, Grid, IconButton, InputAdornment, Tooltip } from '@material-ui/core';
import { Category, Catalog, Categories, User } from 'ordercloud-javascript-sdk';
import DownShiftInput from '../../common/downShiftInput';
import service from '../../common/service'
import LoadingButton from '../../common/loadingButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { PlayerData } from '../../App';
import { mapUserToProps } from '../../redux/stateMappers'; 
import { connect } from 'react-redux';

interface DraftPlayerFormProps {
    currentUser: User,
    player: PlayerData,
    teams: Category[],
    league?: Catalog,
    disabled?: boolean,
    handleTeamUpdate: (team: Category) => void
}

export interface DraftedPlayer extends PlayerData {
    value: number,
}
const DraftPlayerForm: React.FunctionComponent<DraftPlayerFormProps> = (props) => {
    const {player, teams, league, handleTeamUpdate, disabled, currentUser} = props;
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<Category>();
    const [bid, setBid] = useState<number>(player.auctionValueAverage);
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
        //setBid(undefined)
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
                    BudgetRemaining: (league.xp.AuctionBudget - service.GetBudgetSpent(newPlayersArray)),
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
            <Tooltip title={!currentUser.xp?.LeaguesOwned?.includes(league?.ID) ? 
                "Only the league commissioner can make picks. If you are the commissioner log in." : ""}>
                <span>
                    <IconButton style={{padding: '8px'}} onClick={() => setDialogOpen(true)} 
                        disabled={disabled || !currentUser.xp?.LeaguesOwned?.includes(league?.ID)}>
                        <AddCircleOutlineIcon fontSize="small"/>
                    </IconButton>
                </span>
            </Tooltip>
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
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                              }}
                            onChange={handleBidChange} 
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

export default connect(mapUserToProps)(DraftPlayerForm);