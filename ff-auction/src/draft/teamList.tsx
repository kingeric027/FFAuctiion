import React, { useEffect } from 'react'
import { TeamObj } from '../create'
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import classes from '*.module.css';

interface TeamListProps {
    teams: TeamObj[]
}

const TeamList: React.FunctionComponent<TeamListProps> = (props) => {
    const { teams } = props;

    return (
        <div>
        <GridList cols={teams.length}>
        {teams.map((team) => (
          <GridListTile key={team.index}>
            <GridListTileBar
              title={team.name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${classes.title}`}>
                  <StarBorderIcon className={classes.title} />
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