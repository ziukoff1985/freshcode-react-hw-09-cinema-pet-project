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
