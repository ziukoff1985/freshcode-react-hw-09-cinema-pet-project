// import { NavLink } from 'react-router-dom';

// function NavBar() {
//     return (
//         <ul>
//             <li>
//                 <NavLink to='/'>Home</NavLink>
//             </li>
//             <li>
//                 <NavLink to='/movies'>Movies</NavLink>
//             </li>
//             <li>
//                 <NavLink to='/actors'>Actors</NavLink>
//             </li>
//             <li>
//                 <NavLink to='/directors'>Directors</NavLink>
//             </li>
//             <li>
//                 <NavLink to='/studios'>Studios</NavLink>
//             </li>
//         </ul>
//     );
// }

// export default NavBar;

import { NavLink, useLocation } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    Paper,
    alpha,
} from '@mui/material';
import {
    Home as HomeIcon,
    Movie as MovieIcon,
    RecentActors as ActorsIcon,
    TheaterComedy as DirectorsIcon,
    Business as StudiosIcon,
    LocalMovies as LogoIcon,
} from '@mui/icons-material';

function NavBar() {
    const location = useLocation();

    // Масив об'єктів для навігації
    const navItems = [
        { text: 'Home', path: '/', icon: <HomeIcon /> },
        { text: 'Movies', path: '/movies', icon: <MovieIcon /> },
        { text: 'Actors', path: '/actors', icon: <ActorsIcon /> },
        { text: 'Directors', path: '/directors', icon: <DirectorsIcon /> },
        { text: 'Studios', path: '/studios', icon: <StudiosIcon /> },
    ];

    return (
        <Paper
            elevation={0}
            sx={{
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
            }}
        >
            {/* Логотип або Назва проекту */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <LogoIcon color='primary' sx={{ fontSize: 32 }} />
                <Typography
                    variant='h6'
                    sx={{
                        fontWeight: 800,
                        letterSpacing: 1,
                        color: 'primary.main',
                    }}
                >
                    CINEMA
                    <Box component='span' sx={{ color: 'text.primary' }}>
                        LAB
                    </Box>
                </Typography>
            </Box>

            <Divider sx={{ mx: 2, mb: 2 }} />

            <List sx={{ px: 2 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                component={NavLink}
                                to={item.path}
                                sx={{
                                    borderRadius: 3,
                                    // Стилізація активного стану
                                    bgcolor: isActive
                                        ? alpha('#1976d2', 0.1)
                                        : 'transparent',
                                    color: isActive
                                        ? 'primary.main'
                                        : 'text.secondary',
                                    '&.active': {
                                        bgcolor: alpha('#1976d2', 0.1),
                                        color: 'primary.main',
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        },
                                        '& .MuiTypography-root': {
                                            fontWeight: 'bold',
                                        },
                                    },
                                    '&:hover': {
                                        bgcolor: alpha('#1976d2', 0.05),
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 45,
                                        color: isActive
                                            ? 'primary.main'
                                            : 'inherit',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: 'color.primary' }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

export default NavBar;
