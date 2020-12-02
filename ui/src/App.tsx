import { Grid } from '@material-ui/core';
import React from 'react';
import './App.css';
import { NavList } from './components/nav-list';
import { RequestProvider } from './components/providers/request';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Transactions } from './components/pages/transactions';
import { Merchants } from './components/pages/merchants';
import { Dashboard } from './components/pages/dashboard';

function App() {
  return (
    <Grid container spacing={0} style={{ height: '100%' }}>
      <NavList />
      <div className="content">
        <div className="pages">
          <div className="page-content">
            <RequestProvider>
              <Router>
                <Switch>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="/merchants">
                    <Merchants />
                  </Route>
                  <Route path={["/", "/transactions"]}>
                    <Transactions />
                  </Route>
                </Switch>
              </Router>
            </RequestProvider>
          </div>
        </div>
      </div>
    </Grid>

  );
}

export default App;
