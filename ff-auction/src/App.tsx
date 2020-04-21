import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { setPlayers } from './redux/actions';
import { Tokens, Auth } from 'ordercloud-javascript-sdk';
import Home from './home';
import api from './api';
import Draft from './draft';
import Create from './create';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FunctionComponent<PropsFromRedux> = (props) => {

  useEffect(() => {
    Promise.all([
      Tokens.GetValidToken().then((token) => {
        if(token) {
          Tokens.SetAccessToken(token);
        } else {
          Auth.Anonymous(process.env.REACT_APP_ADMIN_CLIENT_ID!, 
            ['ProductReader', 'CategoryReader', 'MeAddressAdmin', 'MeCreditCardAdmin', 'Shopper']).then(response => {
            Tokens.SetAccessToken(response.access_token);
            Tokens.SetRefreshToken(response.refresh_token);
        })
        }
      }), 
      api.getPlayerList().then(res => {
        var playerList = res.data.players.map((p:any) => p.player).sort( 
          function(a: any, b: any ) {
              if (a.draftRanksByRankType.PPR.auctionValue > b.draftRanksByRankType.PPR.auctionValue) {
                  return -1;
              }
              if (b.draftRanksByRankType.PPR.auctionValue > a.draftRanksByRankType.PPR.auctionValue) {
                  return 1;
              }
                  return 0;
          }
      );
          props.dispatch(setPlayers(playerList))
      })
    ])
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact 
            component={Home}
          />
          <Route
            path="/draft"
            component={Draft}
          />
          <Route
            path="/create"
            component={Create}
            />
        </Switch> 
      </BrowserRouter> 
    </div>
  );
}

export default connector(App);
