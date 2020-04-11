import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Route, Switch } from "react-router-dom";
import './App.css';
import { Tokens } from 'ordercloud-javascript-sdk';
import Login from './login';
import Home from './home';

const App: React.FunctionComponent = () => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    Tokens.GetValidToken().then((token) => {
      if(token) {
        setToken(token);
        Tokens.SetAccessToken(token);
      }
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
      {token ? 
        <Switch>
          <Route
            path="/"
            exact 
            component={Home}
          />
        </Switch> : 
        <Login></Login>
      }
    </div>
  );
}

export default App;
