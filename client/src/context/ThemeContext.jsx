import { createContext, useContext } from 'react';
import { createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: 'light',
});

export const getAppTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#9c27b0',
            },
            background: {
                default: mode === 'light' ? '#f4f6f8' : '#121212',
                paper: mode === 'light' ? '#fff' : '#1e1e1e',
                header: mode === 'light' ? '#1976d2' : '#121212',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });

export const useColorMode = () => useContext(ColorModeContext);
