import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import teamData from '../constants/teamData';
import classes from '*.module.css';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    // root: {
    //   width: '100%',
    // }
    tableWrapper: {
      maxHeight: 407,
      overflow: 'auto',
    }
  });
  
export type OrderDirection = "asc" | "desc";

interface PlayerTableHeadProps {
    priorSeason: string
    order?:  OrderDirection,
    orderBy?: string, 
}

const PlayerTableHead:  React.FunctionComponent<PlayerTableHeadProps> = (props) => {
    const {order, orderBy, priorSeason} = props
    const headCells = [
        { id: 'player', numeric: false, disablePadding: true, label: 'Player' },
        { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
        { id: 'team', numeric: false, disablePadding: false, label: 'Team' },
        { id: 'averageValue', numeric: true, disablePadding: false, label: 'Average Value' },
        { id: 'priorAverage', numeric: true, disablePadding: false, label: `${priorSeason} PPR Average` },
      ];
    //   const createSortHandler = property => event => {
    //     onRequestSort(event, property);
    //   };
      return (
        <TableHead>
          <TableRow>
            {headCells.map(headCell => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={order}
                  //onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
}


interface PlayerTableProps {
    playerArray: any[]
}
const PlayerTable: React.FunctionComponent<PlayerTableProps> = (props) =>  {
    const {playerArray} = props;
    const [orderBy, setOrderBy] = useState<string>('averageValue');
    const [order, setOrder] = useState<OrderDirection>('desc');
    const classes = useStyles();
    const currentSeason = (new Date()).getMonth() >= 4 ? (new Date()).getFullYear() :  (new Date()).getFullYear() - 1; 

    return (
        <div>
          <Paper>
            <div className={classes.tableWrapper}>
              <Table stickyHeader
                aria-labelledby="tableTitle">
                <PlayerTableHead
                  priorSeason={(currentSeason-1).toString()}
                  order={order}
                  orderBy={orderBy}
                />
                <TableBody>
                  {playerArray
                    .map((player, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const position: Position = teamData.PositionNames[player.defaultPositionId].Position;
                      const priorSeasonStats = player.stats.filter((s:any) => s.externalId === (currentSeason - 1).toString());
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={player.iid}
                        >
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {player.fullName}
                          </TableCell>
                          <TableCell align="right">{position}</TableCell>
                          <TableCell align="right">{teamData.TeamNames[player.proTeamId]}</TableCell>
                          <TableCell align="right">{player.ownership.auctionValueAverage}</TableCell>
                          <TableCell align="right">{priorSeasonStats?.appliedAverage}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </div>
      );

}