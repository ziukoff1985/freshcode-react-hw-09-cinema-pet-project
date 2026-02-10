import { ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ColorModeContext, getAppTheme } from './ThemeContext';

export const ThemeContextProvider = ({ children }) => {
    const getInitialThemeMode = () =>
        localStorage.getItem('cinemaThemeMode') || 'light';

    const [mode, setMode] = useState(getInitialThemeMode);

    useEffect(() => {
        if (mode) {
            localStorage.setItem('cinemaThemeMode', mode);
        }
    }, [mode]);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
            mode,
        }),
        [mode],
    );

    const theme = useMemo(() => getAppTheme(mode || 'light'), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
