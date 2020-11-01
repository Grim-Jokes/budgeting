import { Container, Grid } from '@material-ui/core';
import React from 'react';
import './App.css';
import { NavList } from './components/nav-list';
import { RequestProvider } from './components/providers/request';
import { TransactionList } from './components/transaction-list';

function App() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={1}>
        <NavList />
      </Grid>
      <Grid item xs={11}>
        <div className="content">
          <RequestProvider>
            <TransactionList />
          </RequestProvider>
        </div>
      </Grid>
    </Grid>

  );
}

export default App;
