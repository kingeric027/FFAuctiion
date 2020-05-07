import React from 'react';
import { Category } from 'ordercloud-javascript-sdk';
import { GridList, GridListTile, GridListTileBar, makeStyles } from '@material-ui/core';
import classes from '*.module.css';

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    // gridList: {
    //   width: 500,
    //   height: 450,
    //   // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    //   transform: 'translateZ(0)',
    // },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
  }));

interface TeamBarProps {
    teamList: Category[]
}

const TeamBar: React.FunctionComponent<TeamBarProps> = (props) => {
    const {teamList} = props
    return (
        <div className={classes.root}>
            <GridList cols={teamList.length}>
                {teamList.map((team: Category) => (
                    <GridListTile key={team.ID}>
                        <GridListTileBar title={team.Name} titlePosition="top"></GridListTileBar>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default TeamBar;