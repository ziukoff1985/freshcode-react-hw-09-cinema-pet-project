import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import CinemaService from '../ServiceBar/CinemaService';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Layout() {
    return (
        <Box>
            <Grid container direction='column'>
                <Grid
                    size={{ xs: 12 }}
                    sx={{
                        padding: '0px',
                        backgroundColor: 'gray',
                        minHeight: '10vh',
                        alignContent: 'center',
                    }}
                >
                    <Header />
                </Grid>
                <Grid
                    container
                    direction='row'
                    sx={{
                        padding: '0px',
                        minHeight: '80vh',
                    }}
                >
                    <Grid
                        size={{ xs: 2 }}
                        sx={{
                            padding: '0px',
                            backgroundColor: 'teal',
                            alignContent: 'center',
                        }}
                    >
                        <NavBar />
                    </Grid>
                    <Grid
                        size={{ xs: 7 }}
                        sx={{
                            padding: '0px',
                            backgroundColor: 'pink',
                            alignContent: 'center',
                        }}
                    >
                        <Outlet />
                    </Grid>
                    <Grid
                        size={{ xs: 3 }}
                        sx={{
                            padding: '0px',
                            backgroundColor: 'yellow',
                            alignContent: 'center',
                        }}
                    >
                        <CinemaService />
                    </Grid>
                </Grid>
                <Grid
                    size={{ xs: 12 }}
                    sx={{
                        padding: '0px',
                        backgroundColor: 'skyblue',
                        minHeight: '10vh',
                        alignContent: 'center',
                    }}
                >
                    <Footer />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Layout;
