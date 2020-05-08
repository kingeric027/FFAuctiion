import React from 'react';
import { mapUserToProps } from '../redux/stateMappers'
import { connect } from 'react-redux';
import { User } from 'ordercloud-javascript-sdk';
import { AppBar, Typography, Toolbar, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));
interface FFAppBarProps {
    currentUser: User
    currentLeague?: string
}

const FFAppBar: React.FunctionComponent<FFAppBarProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">    
                <Toolbar variant="dense" style={{minHeight: '40px'}}>   
                    <Typography variant="body1">{props.currentUser.Username || ''}</Typography>
                    <Typography variant="body1" className={classes.title}>{props.currentLeague || ""}</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )

}


export default connect(mapUserToProps)(FFAppBar);