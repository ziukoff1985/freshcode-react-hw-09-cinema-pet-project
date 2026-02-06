import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NavBar from '../Navigation/NavBar';
import CinemaService from '../ServiceBar/CinemaService';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Layout({ toggleMode, mode }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {/* HEADER */}
            <Paper
                square
                elevation={4}
                sx={{
                    p: 2,
                    backgroundColor: 'background.header',
                    color: 'white',
                }}
            >
                <Header toggleTheme={toggleMode} mode={mode} />
            </Paper>

            <Grid container sx={{ flexGrow: 1 }}>
                {/* NAVIGATION (SIDEBAR) */}
                <Grid
                    size={{ xs: 12, md: 2 }}
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    }}
                >
                    <NavBar />
                </Grid>

                {/* MAIN CONTENT */}
                <Grid
                    size={{ xs: 12, md: 7 }}
                    component='main'
                    sx={{ p: 2, bgcolor: 'background.paper' }}
                >
                    <Outlet />
                </Grid>

                {/* SERVICE BAR */}
                <Grid
                    size={{ xs: 12, md: 3 }}
                    sx={{
                        borderLeft: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    }}
                >
                    <CinemaService />
                </Grid>
            </Grid>

            {/* FOOTER */}
            <Paper
                square
                elevation={4}
                sx={{
                    backgroundColor: 'background.header',
                    mt: 'auto',
                    color: 'white',
                }}
            >
                <Footer />
            </Paper>
        </Box>
    );
}

export default Layout;
