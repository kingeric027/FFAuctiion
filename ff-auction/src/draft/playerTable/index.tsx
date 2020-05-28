import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Paper, makeStyles, createStyles } from '@material-ui/core';
import { Category, Catalog } from 'ordercloud-javascript-sdk';
import DraftPlayerForm, { DraftedPlayer } from './draftPlayerForm';
import SortableTableHead from '../../common/table/sortableTableHeader';
import { PlayerData } from '../../App';

const useStyles = makeStyles(() => 
  createStyles({
    tableWrapper: (props: any) => ({
      maxHeight: props.height || 500,
      overflow: 'auto',
    }),
    tableCell: {
      padding: '0px 5px 0px 5px'
    }
  }));
  
export type OrderDirection = "asc" | "desc"; 



interface PlayerTableProps {
    playerArray: PlayerData[],
    draftedPlayers?: DraftedPlayer[],
    teams: Category[],
    league?: Catalog,
    handleTeamUpdate: (team: Category) => void,
    handlePlayerClick: (player: PlayerData) => void,
    height?: string
}

const PlayerTable: React.FunctionComponent<PlayerTableProps> = (props) =>  {
    const {playerArray, teams, league, handleTeamUpdate, height, draftedPlayers, handlePlayerClick} = props;
    const [orderBy, setOrderBy] = useState<string>('averageValue');
    const [order, setOrder] = useState<OrderDirection>('desc');
    const classes = useStyles({height});
    const currentSeason = (new Date()).getMonth() >= 3 ? (new Date()).getFullYear() :  (new Date()).getFullYear() - 1; 

    const headCells = [
      { id: 'fullName', numeric: false, disablePadding: false, label: 'Player' },
      { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
      { id: 'teamAbv', numeric: false, disablePadding: false, label: 'Team' },
      { id: 'auctionValueAverage', numeric: true, disablePadding: false, label: 'Avg Value' },
      { id: 'priorSeasonAvg', numeric: true, disablePadding: false, label: `${(currentSeason-1).toString()} PPR Avg` },
      { id: 'draft', numeric: false, disablePadding: false, label: 'Draft'}
    ];

    const handleRequestSort = (property: string) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const descendingComparator = (a: any, b: any, orderBy: string) => {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }

    const  getComparator =  (order: string,  orderBy: string) => {
      return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    const stableSort = (array: any[], 
      comparator: (order: string, orderBy: string) => any) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a: any[], b: any[]) => { 
        const order  = comparator(a[0], b[0]);
        if(order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el)  => el[0]);
    }

    return (
        <div>
          <Paper>
            <div className={classes.tableWrapper}>
              <Table stickyHeader
                size="small"
                aria-labelledby="tableTitle">
                {/* <PlayerTableHead
                  priorSeason={(currentSeason-1).toString()}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                /> */}
                <SortableTableHead
                  columns={headCells} sortProps={{
                    order: order,
                    orderBy: orderBy,
                    onRequestSort: handleRequestSort
                  }}></SortableTableHead>
                <TableBody>
                  {stableSort(playerArray, getComparator(order, orderBy))
                    .map((player: PlayerData, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isDrafted = draftedPlayers?.map(player => player.id).includes(player.id)
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={player.id}
                          onClick={(e: any) => handlePlayerClick(player)}
                          style={{
                            backgroundColor: isDrafted ? 'lightgrey' : undefined
                          }}
                        >
                          <TableCell id={labelId} className={classes.tableCell}>{player.fullName}</TableCell>
                          <TableCell align="left" className={classes.tableCell}>{player.position}</TableCell>
                          <TableCell align="left" className={classes.tableCell}>{player.teamAbv}</TableCell>
                          <TableCell align="left" className={classes.tableCell}>{'$' + Math.round(player.auctionValueAverage)}</TableCell>
                          <TableCell align="left" className={classes.tableCell}>{player.priorSeasonAvg}</TableCell>
                          <TableCell align="center" className={classes.tableCell}> 
                            <DraftPlayerForm 
                              player={player}  
                              teams={teams} 
                              league={league}
                              disabled={isDrafted}
                              handleTeamUpdate={handleTeamUpdate}
                            ></DraftPlayerForm>
                          </TableCell>
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

export default PlayerTable;