import React, { useState } from 'react'
import { AppBar, Toolbar, TextField, Switch, FormControlLabel } from '@material-ui/core'
import { mapUserToProps } from '../../redux/stateMappers';

interface TableToolBarProps {
    handleShowSelectedChange: (selected: boolean) => void
    checked: boolean
}

const TableToolBar: React.FunctionComponent<TableToolBarProps> = (props) => {
    const {handleShowSelectedChange, checked} = props;
    const [search, setSearch] = useState<string>();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSwitchChange = (e: any) => {
        handleShowSelectedChange(e.target.checked)
    }
    return (
            <Toolbar variant="dense"> 
                <TextField label="search" value={search} onChange={handleSearchChange}></TextField>
                {/* <FormControlLabel 
                    control={<Switch checked={showSelected}></Switch>}
                    label="Show Selected">
                </FormControlLabel> */}
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleSwitchChange} name="checkedA" />}
                    label="Show Selected"
                />
                
            </Toolbar>
    )
}

export default TableToolBar;