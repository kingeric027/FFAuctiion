import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import './App.css';
import { Tokens, Auth } from 'ordercloud-javascript-sdk';
import Login from './login';
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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
