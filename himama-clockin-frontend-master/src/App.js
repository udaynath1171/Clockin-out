import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createBrowserHistory } from 'history';

import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './routes';
import theme from './theme';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
