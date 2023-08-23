import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { AppContainer } from './AppContainer';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { de } from 'date-fns/locale';

const theme = createTheme({
  // other theme properties
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <AppContainer />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
