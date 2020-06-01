import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import ffReducers from './redux/reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import FFTheme from './constants/ffTheme';
import { ThemeProvider } from '@material-ui/styles';

const store = createStore(ffReducers);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={FFTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
