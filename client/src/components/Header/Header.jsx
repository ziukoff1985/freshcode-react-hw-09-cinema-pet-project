import { IconButton, Typography, Box, useTheme, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../../context/ThemeContext';

function Header() {
    const { toggleColorMode } = useColorMode();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
            }}
        >
            <Typography variant='h6'>CinemaLab</Typography>
            <Tooltip
                title={
                    isDarkMode ? 'Switch to Light mode' : 'Switch to Dark mode'
                }
            >
                {/* <IconButton onClick={toggleColorMode} color='inherit'>
                    {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton> */}

                <Box
                    onClick={toggleColorMode}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        // gap: 1,
                        cursor: 'pointer',
                    }}
                >
                    <IconButton color='inherit'>
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <Typography variant='body1'>Theme</Typography>
                </Box>
            </Tooltip>
        </Box>
    );
}

export default Header;
