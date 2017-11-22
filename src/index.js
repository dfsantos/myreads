import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import muiTheme from './config/theme.config';
import './index.css';

import * as state from './utils/state';

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App state={state} />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
