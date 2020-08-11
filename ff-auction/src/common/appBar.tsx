import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { User, Catalog } from 'ordercloud-javascript-sdk';
import { AppBar, Typography, Toolbar, makeStyles, Button, Box, Theme,Tooltip } from '@material-ui/core';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      color: 'white'
    },
    icon: {
        marginLeft: '5px'
    }
  }));
interface FFAppBarProps {
    currentUser: User,
    height?: string,
    league?: Catalog
    //getAppBarHeight?: (height: number) => void
}

const FFAppBar: React.FunctionComponent<FFAppBarProps> = (props) => {
    const {currentUser, height, league} = props;
    let history = useHistory();
    const classes = useStyles();

    // useEffect(() => {
    //     if(getAppBarHeight) {
    //         const height = document.getElementById("appBar")?.clientHeight;
    //         if(height) getAppBarHeight(height)
    //     }
    // }, [getAppBarHeight]) 

    const goHome = () => {
        history.push('/');
    }
    return (
        <div className={classes.root} id="appBar">
            <AppBar position="static">    
                <Toolbar variant="dense" style={{minHeight: height || '40px'}}>
                    <Box display="flex" justifyContent="space-between" flexGrow={1}>
                        <Button variant="contained" size="small" color="secondary" onClick={goHome}>FFAuction</Button>
                        <Box display="flex">
                            <Typography variant="body1" className={classes.title}>{league?.Name || ""}</Typography>
                            {currentUser?.xp?.LeaguesOwned.includes(league?.ID) &&
                                <Tooltip title="You are the commissioner of this league">
                                    <BusinessCenterIcon color="secondary" className={classes.icon}/>
                                </Tooltip> 
                            }
                        </Box>
                        <Typography variant="body1" className={classes.title}>{props.currentUser.Username || ''}</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )

}

const mapStateToProps = (state: any) => {
    return {
        currentUser: state.user,
    }
}

export default connect(mapStateToProps)(FFAppBar);