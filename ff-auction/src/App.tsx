import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import { Tokens, Auth } from 'ordercloud-javascript-sdk';
import Home from './home';

const App: React.FunctionComponent = () => {
  const [token, setToken] = useState<string>();


  useEffect(() => {
    Tokens.GetValidToken().then((token) => {
      if(token) {
        setToken(token);
        Tokens.SetAccessToken(token);
      } else {
        Auth.Anonymous(process.env.REACT_APP_CLIENT_ID!, 
          ['ProductReader', 'CategoryReader', 'MeAddressAdmin', 'MeCreditCardAdmin']).then(response => {
            Tokens.SetAccessToken(response.access_token);
            setToken(token);
        })
      }
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact 
            component={Home}
          />
        </Switch> 
      </BrowserRouter> 
    </div>
  );
}

export default App;
