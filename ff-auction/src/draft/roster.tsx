import React from 'react';
import { Category, Catalog } from 'ordercloud-javascript-sdk';
import { List, ListItem, TableHead, TableRow, TableCell, TableSortLabel, Table, Paper, TableBody } from '@material-ui/core';
import SortableTableHead, { TableColumn } from '../common/table/sortableTableHeader';


interface RosterProps {
    team: Category,
    league: Catalog
}

const Roster: React.FunctionComponent<RosterProps> = (props) => {
    const {team, league} = props;
    
    const headCells: TableColumn[] = [
        {id: 'position', numeric: false, disablePadding: true, label: 'Position'},
        {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
        {id: 'amount', numeric: true, disablePadding: true, label: 'Amount'}
    ]

    return (
        <Paper>
            <div>
                <Table stickyHeader
                    size="small"
                    aria-labelledby="tableTitle">
                    <SortableTableHead columns={headCells}></SortableTableHead>
                    <TableBody>
                        {team.xp.Players && }
                    </TableBody>
                </Table>
            </div>
        </Paper>
    )

}