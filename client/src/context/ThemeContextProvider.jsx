import { ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import { ColorModeContext, getAppTheme } from './ThemeContext';

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

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

    const theme = useMemo(() => getAppTheme(mode), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
