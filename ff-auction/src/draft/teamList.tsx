import React, { useEffect } from 'react'
//import { TeamObj } from '../create'
import { GridList, GridListTile, GridListTileBar, IconButton, makeStyles } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Category } from 'ordercloud-javascript-sdk';


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
  },
}));

interface TeamListProps {
    teams: Category[]
}

const TeamList: React.FunctionComponent<TeamListProps> = (props) => {
    const { teams } = props;
    const classes = useStyles();

    return (
        <div>
        <GridList cols={teams.length}>
        {teams.map((team, index) => (
          <GridListTile key={index}>
            <GridListTileBar
              title={team.Name} 
              classes={{
                root: classes.titleBar
              }}
              actionIcon={
                <IconButton aria-label={`star`}> 
                  <StarBorderIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
        </div>
    )

}

export default TeamList