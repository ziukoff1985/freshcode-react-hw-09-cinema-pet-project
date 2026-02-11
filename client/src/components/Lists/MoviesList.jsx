import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
    Button,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    ArrowBack as BackIcon,
} from '@mui/icons-material';
import { deleteMovie, getAllMovies } from '../../store/thunks/moviesThunks';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDrawer from '../UI/ConfirmDrawer';

function MoviesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movies = useSelector((state) => state.moviesList.movies);
    const isPending = useSelector((state) => state.moviesList.isPending);

    useEffect(() => {
        dispatch(getAllMovies());
    }, [dispatch]);

    const { open, payload, openConfirm, closeConfirm } = useConfirm();

    const handleDeleteClick = (id) => {
        openConfirm(id);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteMovie(payload));
        closeConfirm();
    };

    if (!movies || isPending)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/')}
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                    }}
                >
                    Back to Home
                </Button>
            </Box>
            <Paper
                elevation={2}
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                }}
            >
                <List sx={{ width: '100%', py: 0 }}>
                    {movies.map((movie, index) => (
                        <Box key={movie.id}>
                            <ListItem
                                alignItems='flex-start'
                                secondaryAction={
                                    <Box>
                                        <Tooltip title='Show details'>
                                            <IconButton
                                                onClick={() =>
                                                    navigate(
                                                        `/movies/${movie.id}`,
                                                    )
                                                }
                                                color='primary'
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title='Edit'>
                                            <IconButton
                                                onClick={() =>
                                                    navigate(
                                                        `/movies/${movie.id}/edit`,
                                                    )
                                                }
                                                color='secondary'
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title='Delete'>
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteClick(movie.id)
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
                                                fontSize: '16px',
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

            <ConfirmDrawer
                open={open}
                title='Delete movie'
                description='Are you sure you want to delete this movie? This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                onConfirm={handleConfirmDelete}
                onClose={closeConfirm}
            />
        </>
    );
}

export default MoviesList;
