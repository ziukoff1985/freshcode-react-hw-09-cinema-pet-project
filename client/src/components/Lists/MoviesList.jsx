import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Typography,
    Paper,
    Divider,
    Box,
    Tooltip,
    CircularProgress,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { deleteMovie, getAllMovies } from '../../store/thunks/moviesThunks';

function MoviesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { movies, isPending, error } = useSelector(
        (state) => state.moviesList,
    );

    useEffect(() => {
        dispatch(getAllMovies());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            dispatch(deleteMovie(id));
        }
    };

    if (isPending)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );
    if (error) return <Typography color='error'>Error: {error}</Typography>;
    return (
        <Paper
            elevation={2}
            sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}
        >
            <Box
                sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}
            >
                <Typography
                    variant='h5'
                    component='div'
                    sx={{ fontWeight: 'bold' }}
                >
                    Movies
                </Typography>
            </Box>
            <List sx={{ width: '100%', py: 0 }}>
                {movies.map((movie, index) => (
                    <Box key={movie.id}>
                        <ListItem
                            alignItems='flex-start'
                            secondaryAction={
                                <Box>
                                    <Tooltip title='Show details'>
                                        <IconButton
                                            component={Link}
                                            to={`${movie.id}`}
                                            color='primary'
                                        >
                                            <ViewIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Edit'>
                                        <IconButton
                                            onClick={() =>
                                                navigate(`${movie.id}/edit`)
                                            }
                                            color='secondary'
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete'>
                                        <IconButton
                                            onClick={() =>
                                                handleDelete(movie.id)
                                            }
                                            color='error'
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt={`${movie.title}`}
                                    src={movie.poster}
                                    sx={{ width: 50, height: 50, mr: 2 }}
                                >
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '1.1rem',
                                        }}
                                    >
                                        {`${movie.title}`}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography
                                            component='span'
                                            variant='body2'
                                            color='text.primary'
                                        >
                                            {movie.studios.join(', ')}
                                        </Typography>
                                        {` — Release year: ${movie.releaseYear}`}
                                    </>
                                }
                            />
                        </ListItem>
                        {index < movies.length - 1 && (
                            <Divider variant='inset' component='li' />
                        )}
                    </Box>
                ))}
            </List>
        </Paper>
    );
}

export default MoviesList;

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//     Grid,
//     Card,
//     CardMedia,
//     CardContent,
//     CardActions,
//     Typography,
//     IconButton,
//     Box,
//     Tooltip,
//     CircularProgress,
//     Chip,
//     alpha,
//     Divider,
// } from '@mui/material';
// import {
//     Visibility as ViewIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Movie as MovieIcon,
// } from '@mui/icons-material';
// import { deleteMovie, getAllMovies } from '../../store/thunks/moviesThunks';

// function MoviesList() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { movies, isPending, error } = useSelector(
//         (state) => state.moviesList,
//     );

//     useEffect(() => {
//         dispatch(getAllMovies());
//     }, [dispatch]);

//     const handleDelete = (id) => {
//         if (window.confirm('Are you sure you want to delete this movie?')) {
//             dispatch(deleteMovie(id));
//         }
//     };

//     if (isPending)
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//                 <CircularProgress size={60} />
//             </Box>
//         );

//     if (error)
//         return (
//             <Typography color='error' sx={{ p: 2 }}>
//                 Error: {error}
//             </Typography>
//         );

//     return (
//         <Box sx={{ flexGrow: 1, p: 2 }}>
//             <Typography
//                 variant='h4'
//                 sx={{ mb: 4, fontWeight: 'bold', color: 'text.primary' }}
//             >
//                 Movies Collection
//             </Typography>

//             <Grid container spacing={3}>
//                 {movies.map((movie) => (
//                     <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={movie.id}>
//                         <Card
//                             sx={{
//                                 height: '100%',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 borderRadius: 4,
//                                 transition: 'transform 0.2s, box-shadow 0.2s',
//                                 '&:hover': {
//                                     transform: 'translateY(-8px)',
//                                     boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
//                                 },
//                                 position: 'relative',
//                             }}
//                         >
//                             {/* Постер фільму */}
//                             <CardMedia
//                                 component='img'
//                                 image={movie.poster}
//                                 alt={movie.title}
//                                 sx={{
//                                     height: 350,
//                                     objectFit: 'cover',
//                                     backgroundColor: 'grey.200',
//                                 }}
//                             />

//                             {/* Рік релізу як бейдж поверх постера */}
//                             <Chip
//                                 label={movie.releaseYear}
//                                 size='small'
//                                 sx={{
//                                     position: 'absolute',
//                                     top: 12,
//                                     right: 12,
//                                     bgcolor: alpha('#000', 0.7),
//                                     color: '#fff',
//                                     backdropFilter: 'blur(4px)',
//                                     fontWeight: 'bold',
//                                 }}
//                             />

//                             <CardContent sx={{ flexGrow: 1 }}>
//                                 <Typography
//                                     gutterBottom
//                                     variant='h6'
//                                     component='div'
//                                     sx={{ fontWeight: 'bold', lineHeight: 1.2 }}
//                                 >
//                                     {movie.title}
//                                 </Typography>
//                                 <Typography
//                                     variant='body2'
//                                     color='text.secondary'
//                                     noWrap
//                                 >
//                                     {movie.studios.join(' • ')}
//                                 </Typography>
//                             </CardContent>

//                             <Divider sx={{ opacity: 0.6 }} />

//                             <CardActions
//                                 sx={{
//                                     justifyContent: 'space-between',
//                                     px: 2,
//                                     py: 1,
//                                 }}
//                             >
//                                 <Box>
//                                     <Tooltip title='View Details'>
//                                         <IconButton
//                                             size='small'
//                                             color='primary'
//                                             onClick={() =>
//                                                 navigate(`${movie.id}`)
//                                             }
//                                         >
//                                             <ViewIcon />
//                                         </IconButton>
//                                     </Tooltip>
//                                     <Tooltip title='Edit'>
//                                         <IconButton
//                                             size='small'
//                                             color='secondary'
//                                             onClick={() =>
//                                                 navigate(`${movie.id}/edit`)
//                                             }
//                                         >
//                                             <EditIcon />
//                                         </IconButton>
//                                     </Tooltip>
//                                 </Box>
//                                 <Tooltip title='Delete'>
//                                     <IconButton
//                                         size='small'
//                                         color='error'
//                                         onClick={() => handleDelete(movie.id)}
//                                     >
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </Tooltip>
//                             </CardActions>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Box>
//     );
// }

// export default MoviesList;
