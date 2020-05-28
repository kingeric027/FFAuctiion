import React, { useState } from 'react'
import { AppBar, Toolbar, TextField, Switch, FormControlLabel, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core'
import { mapUserToProps } from '../redux/stateMappers';

interface TableToolBarProps {
    handleShowSelectedChange: (selected: boolean) => void
    handleSearchChange: (search: string) => void
    handlePositionFilterChange: (position: string) => void
    checked: boolean
}

const TableToolBar: React.FunctionComponent<TableToolBarProps> = (props) => {
    const {handleShowSelectedChange, checked, handleSearchChange, handlePositionFilterChange} = props;
    const [search, setSearch] = useState<string>('');
    const [timer, setTimer] = useState<any>();
    const [positionFilter, setPositionFilter] = useState<string>('All')

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.currentTarget.value; 
        setSearch(search)
        clearTimeout(timer)
        setTimer(null); 
        setTimer(setTimeout(() => handleSearchChange(search), 500))
    }

    const handleSwitchChange = (e: any) => {
        handleShowSelectedChange(e.target.checked)
    }

    const handleFilterChange = (e: any) => {
        setPositionFilter(e.target.value)
        handlePositionFilterChange(e.target.value)
    }
    return (
            <Toolbar variant="dense" style={{display: 'flex', justifyContent: 'space-between'}}>
                <TextField label="search" variant="outlined" value={search} size="small" onChange={onSearchChange} style={{marginTop: '5px'}}></TextField>
                <FormControl>
                    <InputLabel>Position</InputLabel>
                    <Select value={positionFilter} onChange={handleFilterChange}>
                        <MenuItem value={"QB"}>QB</MenuItem>
                        <MenuItem value={"RB"}>RB</MenuItem>
                        <MenuItem value={"WR"}>WR</MenuItem>
                        <MenuItem value={"TE"}>TE</MenuItem>
                        <MenuItem value={"DST"}>DST</MenuItem>
                        <MenuItem value={"K"}>K</MenuItem>
                        <MenuItem value={"All"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleSwitchChange} name="checkedA" />}
                    label="Show Selected"
                />
                
            </Toolbar>
    )
}

export default TableToolBar;