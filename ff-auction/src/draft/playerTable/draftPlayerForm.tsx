import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { Category } from 'ordercloud-javascript-sdk';
import { PlayerData } from '.';
import DownShiftInput from '../../common/downShiftInput';

interface DraftPlayerFormProps {
    player: PlayerData,
    teams: Category[]
}
const DraftPlayerForm: React.FunctionComponent<DraftPlayerFormProps> = (props) => {
    const {player, teams} = props;
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [selectedTeam, setSelectedTeam] = useState<Category>();

    const handleSelectionChange = (value: string | null) => {
        setSelectedTeam(teams.find(team => team.Name && team.Name === value));
    }

    return (
        <React.Fragment>
            <Button onClick={() => setDialogOpen(true)}>Draft</Button>
            <Dialog open={dialogOpen} onClose={()=> setDialogOpen(false)}> 
                <DialogTitle>{player.fullName}</DialogTitle>
                <DialogContent>
                    <DownShiftInput
                        onSelectionChange={handleSelectionChange}
                        selectedTeam={selectedTeam?.Name || ''}
                        teams={teams}> 
                    </DownShiftInput>
                </DialogContent>
            </Dialog>
        </React.Fragment>

    )
}

export default DraftPlayerForm;