import { createContext, useContext } from 'react';
import { createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: 'light',
});

export const getAppTheme = (mode = 'light') =>
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
            text: {
                primary: mode === 'light' ? '#000' : '#fff',
            },
            colorIcons: {
                main: mode === 'light' ? '#1a237e' : '#a19f9f',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
        components: {
            MuiListItem: {
                styleOverrides: {
                    root: {
                        ...(mode === 'dark' && {
                            border: '1px solid',
                            borderColor: '#404040',
                            backgroundColor: '#343434',
                        }),
                    },
                },
            },
        },
    });

export const useColorMode = () => useContext(ColorModeContext);
