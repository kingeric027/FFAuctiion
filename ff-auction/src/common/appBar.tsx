import React, { useEffect } from 'react';
import { mapUserToProps } from '../redux/stateMappers'
import { connect } from 'react-redux';
import { User } from 'ordercloud-javascript-sdk';
import { AppBar, Typography, Toolbar, makeStyles, Button, Box, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));
interface FFAppBarProps {
    currentUser: User
    currentLeague?: string,
    height?: string
    //getAppBarHeight?: (height: number) => void
}

const FFAppBar: React.FunctionComponent<FFAppBarProps> = (props) => {
    const {currentLeague, currentUser, height} = props;
    const classes = useStyles();

    // useEffect(() => {
    //     if(getAppBarHeight) {
    //         const height = document.getElementById("appBar")?.clientHeight;
    //         if(height) getAppBarHeight(height)
    //     }
    // }, [getAppBarHeight]) 
    return (
        <div className={classes.root} id="appBar">
            <AppBar position="static">    
                <Toolbar variant="dense" style={{minHeight: height || '40px'}}> 
                    <Button variant="contained" size="small" href="/" color="secondary">FFAuction</Button>
                    <Typography variant="body1" className={classes.title}>{props.currentLeague || ""}</Typography>
                    <Typography variant="body1">{props.currentUser.Username || ''}</Typography>
                </Toolbar>
            </AppBar>
        </div>
    )

}


export default connect(mapUserToProps)(FFAppBar);