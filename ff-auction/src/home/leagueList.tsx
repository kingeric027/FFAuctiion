import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Catalogs, Catalog, User } from 'ordercloud-javascript-sdk';
import { flatten } from 'lodash';
import { ListItem, List, ListItemText, Link,  Theme, createStyles, withStyles, Card, CardHeader, CardContent, Box, ListItemAvatar, Avatar, Tooltip } from '@material-ui/core';
import { mapUserToProps } from '../redux/stateMappers';
import { connect } from 'react-redux';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

interface LeagueListProps {
    classes: any,
    currentUser: User
}

const styles = (theme: Theme) => createStyles({
    item: {
        borderBottom: '1px solid lightgrey',
    },
    textItem: {
        textAlign: 'left'
    },
    root: {
        width: '50%', 
        margin: 'auto',
    },
    header: {
        textAlign: 'left',
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    },
    content: {
        paddingTop: '0px'
    },
    icon: {
        margin: 'auto'
    }
})

const LeagueList: React.FunctionComponent<LeagueListProps> = (props) => {
    const { classes } = props;
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
        // <Paper className={classes.root}>  
        <Card className={classes.root}>
            <CardHeader title="Existing Leagues" className={classes.header}></CardHeader>
            <CardContent className={classes.content}> 
                <Scrollbars style={{ width: '100%', height: `calc(100vh * 0.5)`}}>
                    <List >
                        {leagues && leagues.length>0 && leagues.map(league => (
                            // <ListItem key={league.ID} className={classes.item}>  
                            <Box display='flex' className={classes.item}>
                                <div style={{width: '65%'}}>
                                    <ListItemText className={classes.textItem} 
                                        primary={<Link href={`/draft/${league.ID}`}>{league.Name}</Link>}
                                        secondary={league.xp?.Season ? 'Season: ' + league.xp.Season : ''}> 
                                    </ListItemText>
                                </div>
                                <Box display="flex" justifyContent="flex-start" style={{width: '35%', marginRight: '10px'}}>
                                    <ListItemText className={classes.textItem} primary={league.Description} secondary={"Owner"}></ListItemText>
                                    {props.currentUser.Username === league.Description && 
                                    <Tooltip title="You are the commissioner of this league">
                                        <BusinessCenterIcon color="secondary" className={classes.icon} />
                                    </Tooltip>
                                    } 
                                </Box>
                            </Box>
                                
                            // </ListItem>
                            ))
                        }
                    </List>
                </Scrollbars>
            </CardContent>
        </Card>
            
        // </Paper> 
    )
}

export default connect(mapUserToProps)(withStyles(styles)(LeagueList));