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
  listItemText: {
    marginTop: '3px',
    marginBottom: '0px'
  },
  listitem: {
    padding: '0px 5px 0px 5px',
    textAlign: 'center'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  }
}));

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

interface TeamListProps {
    teams: Category[]
    league: Catalog
    onSelectedTeamChange: (team: Category) => void
    height?: string
    selectedTeam?: Category
    //getTeamListHeight?: (height: number) => void
}

const TeamList: React.FunctionComponent<TeamListProps> = (props) => {
    const { teams, league, onSelectedTeamChange, height, selectedTeam } = props;
    const classes = useStyles();

    const getColorForPercentage = (pct: number)  => {
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

  const handleTeamClick = (team: Category) => (e: any) => {  
    onSelectedTeamChange(team)
  }

    return (
        <div id="teamList">
        <GridList cols={teams.length}>
        {teams.map((team, index) => (
          <GridListTile key={index} 
          onClick={handleTeamClick(team)}
          style={{backgroundColor: getColorForPercentage(team.xp?.BudgetRemaining / league.xp?.AuctionBudget),
                height: height, 
                cursor:'pointer',
                border: selectedTeam?.ID === team.ID ? '2px solid grey' : '1px solid lightgrey',
                borderStyle: selectedTeam?.ID === team.ID ? 'inset' : 'solid',
                padding: 0,
                zIndex: 5}}>      
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
                <ListItemText className={classes.listItemText}
                  primary={'Total: $' + team.xp?.BudgetRemaining}></ListItemText>  
              </ListItem>
              <ListItem className={classes.listitem}>
                <ListItemText className={classes.listItemText} 
                  primary={"Max: $" + service.GetMaxBid(team, league)}></ListItemText>
              </ListItem>
              <ListItem className={classes.listitem}>
                <ListItemText className={classes.listItemText} 
                  primary={"Avg: $" + Math.floor((team.xp?.BudgetRemaining  / (league.xp?.RosterSize - team.xp?.Players?.length)))}></ListItemText>
              </ListItem>  
            </List>
          </GridListTile>
        ))}
      </GridList>
        </div>
    )

}

export default TeamList