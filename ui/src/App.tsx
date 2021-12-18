import React, { useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import './App.css';
import { NavList } from './components/nav-list';
import { RequestProvider } from './components/providers/request';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Transactions } from './components/pages/transactions';
import { Merchants } from './components/pages/merchants';
import { Dashboard } from './components/pages/dashboard';

import './themes/default.css';
import { Categories } from './components/pages/categories';

function App() {
  const root = document.getElementById('root');
  const [theme] = useState("default");

  root?.classList.add(theme);

  return (
    <Grid container spacing={0} style={{ height: '100%' }}>
      <Box boxShadow={3}>
        <NavList />
      </Box>
      <Container className="pages">
        <RequestProvider>
          <Router>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/merchants">
                <Merchants />
              </Route>
              <Route path={"/categories"}>
                <Categories />
              </Route>
              <Route path={["/", "/transactions"]}>
                <Transactions />
              </Route>
            </Switch>
          </Router>
        </RequestProvider>

      </Container>
    </Grid>

  );
}

export default App;
