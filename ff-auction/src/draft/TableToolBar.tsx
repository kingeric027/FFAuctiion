import React, { useState } from 'react'
import { AppBar, Toolbar, TextField, Switch, FormControlLabel } from '@material-ui/core'
import { mapUserToProps } from '../redux/stateMappers';

interface TableToolBarProps {
    handleShowSelectedChange: (selected: boolean) => void
    handleSearchChange: (search: string) => void
    checked: boolean
}

const TableToolBar: React.FunctionComponent<TableToolBarProps> = (props) => {
    const {handleShowSelectedChange, checked, handleSearchChange} = props;
    const [search, setSearch] = useState<string>('');
    const [timer, setTimer] = useState<any>();

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
    return (
            <Toolbar variant="dense" style={{display: 'flex', justifyContent: 'space-between'}}>
                <TextField label="search" variant="outlined" value={search} size="small" onChange={onSearchChange} style={{marginTop: '5px'}}></TextField>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleSwitchChange} name="checkedA" />}
                    label="Show Selected"
                />
                
            </Toolbar>
    )
}

export default TableToolBar;