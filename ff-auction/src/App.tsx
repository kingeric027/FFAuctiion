import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { setPlayers, setUser } from './redux/actions';
import { Tokens, Auth, Me } from 'ordercloud-javascript-sdk';
import Home from './home';
import api from './api';
import Draft from './draft';
import Create from './create';
import { connect, ConnectedProps} from 'react-redux';
import service from './common/service';
import { teamData } from './constants/appData';
import AllRosters from './rosters';
import { Theme, ThemeProvider } from '@material-ui/core';
import { mapThemeToProps } from './redux/stateMappers';
import ffTheme from './constants/ffTheme';

const connector = connect(mapThemeToProps);

export type Position = "RB" | "WR" | "QB" | "TE" | "DST" | "K" | "NA";
export interface PlayerData {
  id: string,
  position: Position,
  teamAbv: string,
  fullName: string,
  auctionValueAverage: number,
  priorSeasonAvg: number,
  seasonOutlook: string
}

const mapPlayerData = (playerArray: any[]) => {
  return playerArray.filter((p:any) => p.player.ownership?.auctionValueAverage > 0).map(p => {
    const currentSeason = service.GetCurrentSeason(); 
    const priorSeasonStats = p.player.stats ? p.player.stats.filter((s:any) => s.id === ('00'+(currentSeason - 1).toString())) : {};
    var playerItem: PlayerData  = {
      id: p.player.id,
      position: teamData.PositionNames[p.player.defaultPositionId]?.Position || "NA",
      teamAbv: teamData.TeamNames[p.player.proTeamId]?.Abv || "NA",
      fullName: p.player.fullName,
      auctionValueAverage: Math.round(p.player.ownership?.auctionValueAverage),
      priorSeasonAvg: Math.round(10 * priorSeasonStats[0]?.appliedAverage)/10,
      seasonOutlook: p.player.seasonOutlook
    }
    return playerItem;
  })
}

type PropsFromRedux = ConnectedProps<typeof connector>

type HomeProps = PropsFromRedux & {
  currentTheme?: Theme
}

const App: React.FunctionComponent<HomeProps> = (props) => {
  if(props.currentTheme) {
    console.log("===themes===")
    console.log(props.currentTheme)
    console.log(ffTheme) 
  }
  const [ready, setReady] = useState<Boolean>(false);

  useEffect(() => {
    Promise.all([
      Tokens.GetValidToken().then((token) => {
        if(token) {
          Tokens.RemoveAccessToken(); //remove the access token if there is one currently
          Tokens.SetAccessToken(token);
          Me.Get().then((curUser) => {
            props.dispatch(setUser(curUser))
            setReady(true);
          });
        } else { 
          Auth.Anonymous(process.env.REACT_APP_ADMIN_CLIENT_ID!, 
            ['AdminUserAdmin', 'AdminUserGroupAdmin', 'CategoryReader', 'CategoryAdmin', 
            'CatalogReader', 'CatalogAdmin', 'SetSecurityProfile', 'SecurityProfileAdmin']).then(response => {
            Tokens.SetAccessToken(response.access_token);
            Tokens.SetRefreshToken(response.refresh_token);
            Me.Get().then((curUser) => {
              props.dispatch(setUser(curUser))
              setReady(true)
            });
        })
        }
      }), 
      api.getPlayerList().then(res => {
        var playerList = mapPlayerData(res.data.players).sort(
          function(a: PlayerData, b: PlayerData) {
            if(a.auctionValueAverage > b.auctionValueAverage) {
              return -1;
            }
            if(b.auctionValueAverage > a.auctionValueAverage) {
              return 1;
            }
            return 0;
          }
        )
          props.dispatch(setPlayers(playerList))
      })
    ])
  },[props]) 

  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={props.currentTheme?.palette ? props.currentTheme : ffTheme}>  
        {ready && 
          <Switch>
            <Route
              path="/"
              exact
              component={Home}
            />
            <Route
              path="/draft/:leagueId"
              component={Draft}
            />
            <Route
              path="/create"
              component={Create}
            />
            <Route
              path="/teams/:leagueId"
              component={AllRosters}
            />
          </Switch>
        }
      </ThemeProvider>

      </BrowserRouter> 
    </div>
  );
}

export default connector(App);
//export default connect(mapThemeToProps)(App);
