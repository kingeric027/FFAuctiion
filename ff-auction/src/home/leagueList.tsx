import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Catalogs, Catalog, User } from 'ordercloud-javascript-sdk';
import { flatten } from 'lodash';
import { ListItem, List, ListItemText, Link, Chip, Button, LinearProgress, ListItemSecondaryAction, Paper } from '@material-ui/core';
import { mapUserToProps } from '../redux/stateMappers';
import { connect } from 'react-redux';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

interface LeagueListProps {
    currentUser: User
}

const LeagueList: React.FunctionComponent<LeagueListProps> = (props) => {
    const [leagues, setLeagues] = useState<Catalog[]>();

    useEffect(() => {
        Catalogs.List().then((catList) => {
            if(catList.Meta.TotalPages === 1) {
                setLeagues(catList.Items)
            } else {
                var queue: Promise<any>[] = [];
                for(var i=2; i<=catList.Meta.TotalPages; i++) {
                    queue.push(Catalogs.List({page: i}))
                }
                Promise.all(queue).then((result) => {
                    setLeagues(catList.Items.concat(flatten(result.map(res => res.Items))))
                })
            }
        })
    }, [])

    return(
        <Paper style={{width: '50%', margin: 'auto'}}>  
            <Scrollbars style={{ width: '100%', height: `calc(100vh * 0.5)`}}>
                <List>
                    {leagues && leagues.length>0 && leagues.map(league => (
                        <ListItem key={league.ID} style={{borderBottom: '1px solid lightgrey'}}> 
                            <ListItemText primary={
                                //<Button variant="contained" size="small" href={`/draft/${league.ID}`}>{league.Name}</Button>
                                <Link href={`/draft/${league.ID}`} style={{color: 'green'}}>{league.Name}</Link>
                            }
                                secondary={league.xp?.Season ? 'Season: ' + league.xp.Season : ''}> 
                            </ListItemText>
                            {props.currentUser.Username === league.Description && 
                                <Chip label="Commissioner" icon={<BusinessCenterIcon />}></Chip>}
                        </ListItem>
                        ))
                    }
                </List>
            </Scrollbars>
        </Paper> 
    )
}

export default connect(mapUserToProps)(LeagueList);