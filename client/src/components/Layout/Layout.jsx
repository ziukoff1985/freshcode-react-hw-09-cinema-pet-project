import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NavBar from '../Navigation/NavBar';
import CinemaService from '../ServiceBar/CinemaService';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Layout() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Paper
                square
                elevation={4}
                sx={{
                    p: 2,
                    backgroundColor: 'background.header',
                    color: 'white',
                }}
            >
                <Header />
            </Paper>

            <Grid container sx={{ flexGrow: 1, minHeight: '80%' }}>
                <Grid
                    size={{ xs: 12, md: 1.8 }}
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    }}
                >
                    <NavBar />
                </Grid>

                <Grid
                    size={{ xs: 12, md: 6.7 }}
                    component='main'
                    minHeight='100%'
                    sx={{ p: 2, bgcolor: 'background.paper' }}
                >
                    <Outlet />
                </Grid>

                <Grid
                    size={{ xs: 12, md: 3.5 }}
                    sx={{
                        borderLeft: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    }}
                >
                    <CinemaService />
                </Grid>
            </Grid>

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
