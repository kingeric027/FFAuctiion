import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { red, green, brown, yellow, purple, indigo } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

// const theme = createMuiTheme({
//   palette: {
//     WR: yellow,
//     TE: red,
//     QB: green,
//     DST: purple,
//     K: brown
//   },
//   status: {
//     danger: 'orange',
//   },
// });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
