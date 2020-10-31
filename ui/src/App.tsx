import React from 'react';
import './App.css';
import { RequestProvider } from './components/providers/request';
import { TransactionList } from './components/transaction-list';

function App() {
  return (
    <RequestProvider>
      <TransactionList />
    </RequestProvider>

  );
}

export default App;
