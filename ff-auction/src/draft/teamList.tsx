import React from 'react'
//import { TeamObj } from '../create'
import { GridList, GridListTile, GridListTileBar, IconButton, makeStyles, ListItemText, List, ListItem } from '@material-ui/core';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import { Category, Catalog } from 'ordercloud-javascript-sdk';
import service from '../common/service';


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
    textAlign: 'center',
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  }
}));

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xBE, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xBE, b: 0 } } ];

interface TeamListProps {
    teams: Category[]
    league: Catalog
}

const TeamList: React.FunctionComponent<TeamListProps> = (props) => {
    const { teams, league } = props;
    const classes = useStyles();

    const getColorForPercentage = (pct: number)  => {
      console.log(percentColors)
      for (var i = 1; i < percentColors.length - 1; i++) {
          if (pct < percentColors[i].pct) {
              break;
          }
      }
      var lower = percentColors[i - 1];
      var upper = percentColors[i];
      var range = upper.pct - lower.pct;
      var rangePct = (pct - lower.pct) / range;
      var pctLower = 1 - rangePct;
      var pctUpper = rangePct;
      var color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
      };
      return 'rgb(' + [color.r, color.g, color.b, 0.5].join(',') + ')';
      // or output as hex if preferred
  };

    return (
        <div>
        <GridList cols={teams.length}>
        {teams.map((team, index) => (
          <GridListTile key={index} 
          style={{backgroundColor: getColorForPercentage(team.xp?.BudgetRemaining / league.xp?.AuctionBudget),
          height: '150px'}}>  
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
                <ListItemText primary={"Max: $" + service.GetMaxBid(team, league)}></ListItemText>
              </ListItem>
              <ListItem className={classes.listitem}>
                <ListItemText primary={"Avg: $" + Math.floor((team.xp?.BudgetRemaining  / (league.xp?.RosterSize - team.xp?.Players?.length)))}></ListItemText>
              </ListItem>  
            </List>
          </GridListTile>
        ))}
      </GridList>
        </div>
    )

}

export default TeamList