import React from 'react';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';

function App() {
  return (
    <AppLayout>
      <AppBar />
      <h1>Welcome to Crypto Dashboard</h1>
    </AppLayout>
  );
}

export default App;
