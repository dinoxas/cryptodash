import React from 'react';
import './App.css';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';
import Settings from '../Settings';
import Content from '../Shared/Content';
import Dashboard from '../Dashboard';
import AppFooter from './AppFooter';

function App() {
  return (
    <AppProvider>
      <AppBar />
      <AppLayout>
        <Content>
          <Dashboard />
          <Settings />
        </Content>
      </AppLayout>
      <AppFooter />
    </AppProvider>
  );
}

export default App;
