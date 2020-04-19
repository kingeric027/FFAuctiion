import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { Tokens, Auth } from 'ordercloud-javascript-sdk';
import Home from './home';
import api from './api';
import Draft from './draft';

const App: React.FunctionComponent = () => {
  const [token, setToken] = useState<string>();
  const [playerArray, setPlayerArray] = useState<any[]>();


  // useEffect(() => {
  //   Tokens.GetValidToken().then((token) => {
  //     if(token) {
  //       setToken(token);
  //       Tokens.SetAccessToken(token);
  //     } else {
  //       Auth.Anonymous(process.env.REACT_APP_CLIENT_ID!, 
  //         ['ProductReader', 'CategoryReader', 'MeAddressAdmin', 'MeCreditCardAdmin', 'Shopper']).then(response => {
  //           Tokens.SetAccessToken(response.access_token);
  //           Tokens.SetRefreshToken(response.refresh_token);
  //           setToken(token);
  //       })
  //     }
  //   })
  //   .then(()  => {
  //     api.getPlayerList().then(res => {
  //       var playerList = res.data.players.map((p:any) => p.player)
  //       setPlayerArray(playerList);
  //     })
  //   })
  // }, [])

  useEffect(() => {
    Promise.all([
      Tokens.GetValidToken().then((token) => {
        if(token) {
          setToken(token);
          Tokens.SetAccessToken(token);
        } else {
          Auth.Anonymous(process.env.REACT_APP_CLIENT_ID!, 
            ['ProductReader', 'CategoryReader', 'MeAddressAdmin', 'MeCreditCardAdmin', 'Shopper']).then(response => {
            Tokens.SetAccessToken(response.access_token);
            Tokens.SetRefreshToken(response.refresh_token);
            setToken(token);
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
        setPlayerArray(playerList);
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
            render={(props) => <Home {...props} playerArray={playerArray} />}
          />
          <Route
            path="/draft"
            render={(props) => <Draft {...props} playerArray={playerArray} />}
          />
        </Switch> 
      </BrowserRouter> 
    </div>
  );
}

export default App;
