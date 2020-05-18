import React from 'react';
import { Category, Catalog } from 'ordercloud-javascript-sdk';
import { TableRow, TableCell, Table, Paper, TableBody } from '@material-ui/core';
import SortableTableHead, { TableColumn } from '../common/table/sortableTableHeader';
import { DraftedPlayer } from './playerTable/draftPlayerForm';


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

    const positionSort = (a: any, b: any) => {
        //want qb, rb, wr, te, dst, k
        const positionOrder: any = {
            "QB": 1,
            "RB": 2,
            "WR": 3,
            "TE": 4,
            "DST": 5,
            "K": 6
        };

        if(positionOrder[a.position] < positionOrder[b.position]) {
            return -1;
        } else if(positionOrder[a.position] > positionOrder[b.position]) {
            return 1;
        } 
        return 0;
    }

    return (
        <Paper>
            <div>
                <Table stickyHeader
                    size="small"
                    aria-labelledby="tableTitle">
                    <SortableTableHead columns={headCells}></SortableTableHead>
                    <TableBody>
                        {team.xp.Players && team.xp.Players.sort(positionSort).map((player: DraftedPlayer) => (
                            <TableRow tabIndex={-1} key={player.id}>
                                <TableCell>{player.fullName}</TableCell>
                                <TableCell>{player.position}</TableCell>
                                <TableCell>{player.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Paper>
    )
}

export default Roster;