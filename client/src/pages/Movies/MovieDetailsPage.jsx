import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Chip,
    Divider,
    Card,
    CardMedia,
    alpha,
    Avatar,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Edit as EditIcon,
    Cake,
    DeleteForever,
    Language,
} from '@mui/icons-material';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { deleteMovie, getMovieById } from '../../store/thunks/moviesThunks';
import {
    clearCurrentMovie,
    setMovieForEdit,
} from '../../store/slices/moviesSlice';
import Loader from '../../components/UI/Loader';
import ErrorMessage from '../../components/UI/ErrorMessage';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDrawer from '../../components/UI/ConfirmDrawer';

function MovieDetailsPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentMovie = useSelector((state) => state.moviesList.currentMovie);
    const error = useSelector((state) => state.moviesList.error);

    useEffect(() => {
        dispatch(getMovieById(id));
        return () => {
            dispatch(clearCurrentMovie());
        };
    }, [dispatch, id]);

    const { open, payload, openConfirm, closeConfirm } = useConfirm();

    const handleDeleteClick = () => {
        openConfirm(id);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteMovie(payload));
        closeConfirm();
        navigate('/movies');
    };

    const handleEditClick = () => {
        dispatch(setMovieForEdit(currentMovie));
        navigate(`/movies/${id}/edit`);
    };

    if (!currentMovie && !error) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorMessage
                error={error}
                btnText='Back to movies list'
                to='/movies'
            />
        );
    }

    return (
        <>
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        startIcon={<BackIcon />}
                        onClick={() => navigate('/movies')}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                        }}
                    >
                        Back to movies list
                    </Button>
                </Box>

                <Paper
                    elevation={6}
                    sx={{
                        p: { xs: 2, md: 1.5 },
                        borderRadius: 5,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Grid container spacing={5} alignItems='stretch'>
                        {/* Movie's photo */}
                        <Grid size={{ xs: 12, md: 4.7 }}>
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                }}
                            >
                                <CardMedia
                                    component='img'
                                    image={currentMovie.poster}
                                    alt={currentMovie.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        aspectRatio: '3/4',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Card>
                        </Grid>

                        {/* Movie's info */}
                        <Grid
                            size={{ xs: 12, md: 7.3 }}
                            sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    gap: 1,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant='h2'
                                        sx={{
                                            fontWeight: 900,
                                            color: 'text.primary',
                                            letterSpacing: '-0.02em',
                                            fontSize: {
                                                xs: '24px',
                                                md: '36px',
                                            },
                                        }}
                                    >
                                        {currentMovie.title}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant={
                                            location.pathname.includes('edit')
                                                ? 'disabled'
                                                : 'contained'
                                        }
                                        size='medium'
                                        startIcon={<EditIcon />}
                                        // onClick={() => navigate('edit')}
                                        onClick={handleEditClick}
                                        sx={{
                                            boxShadow:
                                                '0 4px 14px 0 rgba(0,118,255,0.39)',
                                        }}
                                    >
                                        {location.pathname.includes('edit')
                                            ? 'Now Editing...'
                                            : 'Edit'}
                                    </Button>
                                    <Button
                                        variant='contained'
                                        size='medium'
                                        color='error'
                                        startIcon={<DeleteForever />}
                                        onClick={handleDeleteClick}
                                        sx={{
                                            boxShadow:
                                                '0 4px 14px 0 rgba(209, 42, 42, 0.39)',
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2, opacity: 0.6 }} />

                            {/* Movie's details */}
                            <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha('#1a237e', 0.1),
                                            color: 'colorIcons.main',
                                        }}
                                    >
                                        <Language fontSize='small' />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant='caption'
                                            color='text.secondary'
                                        >
                                            Country
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {currentMovie.country}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5,
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha('#1a237e', 0.1),
                                            color: 'colorIcons.main',
                                        }}
                                    >
                                        <Cake fontSize='small' />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant='caption'
                                            color='text.secondary'
                                        >
                                            Release Year
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {currentMovie.releaseYear}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    width: '100%',
                                    // mb: 1,
                                }}
                            >
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 2,
                                        color: 'primary.main',
                                    }}
                                >
                                    Directors:
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    {currentMovie.directors.map(
                                        (director, i) => (
                                            <Chip
                                                key={i}
                                                label={director}
                                                sx={{
                                                    borderRadius: '12px',
                                                    fontWeight: 500,
                                                }}
                                            />
                                        ),
                                    )}
                                </Box>
                            </Box>

                            <Box
                                sx={{ display: 'flex', gap: 2, width: '100%' }}
                            >
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 2,
                                        color: 'primary.main',
                                    }}
                                >
                                    Actors:
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    {currentMovie.actors.map((actor, i) => (
                                        <Chip
                                            key={i}
                                            label={actor}
                                            sx={{
                                                borderRadius: '12px',
                                                fontWeight: 500,
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <Box
                                sx={{ display: 'flex', gap: 2, width: '100%' }}
                            >
                                <Typography
                                    variant='h6'
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 2,
                                        color: 'primary.main',
                                    }}
                                >
                                    Studios:
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 2,
                                    }}
                                >
                                    {currentMovie.studios.map((studio, i) => (
                                        <Chip
                                            key={i}
                                            label={studio}
                                            sx={{
                                                borderRadius: '12px',
                                                fontWeight: 500,
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
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

export default MovieDetailsPage;
