import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainRoutes from "./routes/main.routes";
import { ThemeProvider } from '@mui/material';
import lightTheme from './theme/light.theme';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <MainRoutes />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
