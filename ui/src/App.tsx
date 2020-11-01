import { Grid } from '@material-ui/core';
import React from 'react';
import './App.css';
import { NavList } from './components/nav-list';
import { RequestProvider } from './components/providers/request';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Transactions } from './components/pages/transactions';

function App() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1}>
        <NavList />
      </Grid>
      <Grid item xs={11}>
        <RequestProvider>
          <Router>
            <Switch>
              <Route path="/transactions">
                <Transactions />
              </Route>
              <Route path={["/"]}>
                <Transactions />
              </Route>
            </Switch>
          </Router>
        </RequestProvider>
      </Grid>
    </Grid>

  );
}

export default App;
