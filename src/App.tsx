import React from 'react';
import './App.css';
import {Dashboard} from './views/dashboard';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Dashboard />
      <AmplifySignOut />
    </ThemeProvider>
  );
}

export default withAuthenticator(App);
