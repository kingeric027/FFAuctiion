import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { teamData } from '../../constants/appData';
import { Paper, makeStyles } from '@material-ui/core';
import service from '../../common/service';

const useStyles = makeStyles({
    tableWrapper: {
      maxHeight: 500,
      overflow: 'auto',
    }
  });
  
export type OrderDirection = "asc" | "desc";

interface PlayerTableHeadProps {
    priorSeason: string
    order?:  OrderDirection,
    orderBy?: string, 
    onRequestSort: (property: any) => void
}

const PlayerTableHead:  React.FunctionComponent<PlayerTableHeadProps> = (props) => {
    const {order, orderBy, priorSeason, onRequestSort} = props
    const headCells = [
        { id: 'fullName', numeric: false, disablePadding: true, label: 'Player' },
        { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
        { id: 'teamAbv', numeric: false, disablePadding: false, label: 'Team' },
        { id: 'auctionValueAverage', numeric: true, disablePadding: false, label: 'Average Value' },
        { id: 'priorSeasonAvg', numeric: true, disablePadding: false, label: `${priorSeason} PPR Average` },
      ];

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
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => onRequestSort(headCell.id)}    
                >
                  {headCell.label}
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

interface PlayerData {
  id: string,
  position: string,
  teamAbv: string,
  fullName: string,
  auctionValueAverage: number,
  priorSeasonAvg: number
}

const mapPlayerData = (playerArray: any[]) => {
  return playerArray.map(player => {
    const currentSeason = service.GetCurrentSeason(); 
    const priorSeasonStats = player.stats.filter((s:any) => s.id === ('00'+(currentSeason - 1).toString()));
    var playerItem: PlayerData  = {
      id: player.id,
      position: teamData.PositionNames[player.defaultPositionId]?.Position || "NA",
      teamAbv: teamData.TeamNames[player.proTeamId]?.Abv || "NA",
      fullName: player.fullName,
      auctionValueAverage: Math.round(player.ownership.auctionValueAverage),
      priorSeasonAvg: Math.round(10 * priorSeasonStats[0]?.appliedAverage)/10
    }
    return playerItem;
  })
}

const PlayerTable: React.FunctionComponent<PlayerTableProps> = (props) =>  {
    const {playerArray} = props;
    const [playerData, setPlayerData] = useState<PlayerData[]>();
    const [orderBy, setOrderBy] = useState<string>('averageValue');
    const [order, setOrder] = useState<OrderDirection>('desc');
    const classes = useStyles();
    const currentSeason = (new Date()).getMonth() >= 3 ? (new Date()).getFullYear() :  (new Date()).getFullYear() - 1; 

    useEffect(() => {
      setPlayerData(mapPlayerData(playerArray))
    },[playerArray])

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
                <PlayerTableHead
                  priorSeason={(currentSeason-1).toString()}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {playerData && stableSort(playerData, getComparator(order, orderBy))
                    .slice(0,50)
                    .map((player, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={player.id}
                        >
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {player.fullName}
                          </TableCell>
                          <TableCell align="right">{player.position}</TableCell>
                          <TableCell align="right">{player.teamAbv}</TableCell>
                          <TableCell align="right">{'$' + Math.round(player.auctionValueAverage)}</TableCell>
                          <TableCell align="right">{player.priorSeasonAvg}</TableCell>
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