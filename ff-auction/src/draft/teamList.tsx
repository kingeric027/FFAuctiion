import React, { useEffect } from 'react'
//import { TeamObj } from '../create'
import { GridList, GridListTile, GridListTileBar, IconButton, makeStyles, ListItemText, List, ListItem } from '@material-ui/core';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import { Category, Catalog } from 'ordercloud-javascript-sdk';


const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    position: "inherit"
  },
  listitem: {
    padding: '0px 5px 0px 5px',
    textAlign: 'center'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0
  }
}));

interface TeamListProps {
    teams: Category[]
    league: Catalog
}

const TeamList: React.FunctionComponent<TeamListProps> = (props) => {
    const { teams, league } = props;
    const classes = useStyles();

    return (
        <div>
        <GridList cols={teams.length}>
        {teams.map((team, index) => (
          <GridListTile key={index}> 
            <GridListTileBar
              title={team.Name} 
              titlePosition="top" 
              classes={{
                root: classes.titleBar
              }}
              actionIcon={
                <IconButton> 
                  <SportsFootballIcon /> 
                </IconButton>
              }
            />
            <List dense className={classes.list}>
              <ListItem className={classes.listitem}> 
                <ListItemText primary={'Total: $' + team.xp?.BudgetRemaining}></ListItemText>  
              </ListItem>
              <ListItem className={classes.listitem}>
                <ListItemText primary={"Max bid: $" + (team.xp?.BudgetRemaining - (league.xp?.RosterSize - team.xp?.Players?.length - 1))}></ListItemText>
              </ListItem>
              <ListItem className={classes.listitem}>
                <ListItemText primary={"Avg bid: $" + Math.floor((team.xp?.BudgetRemaining  / (league.xp?.RosterSize - team.xp?.Players?.length)))}></ListItemText>
              </ListItem>
            </List>
          </GridListTile>
        ))}
      </GridList>
        </div>
    )

}

export default TeamList