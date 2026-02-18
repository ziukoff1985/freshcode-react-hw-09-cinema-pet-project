import { useEffect, useState } from 'react';
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
    keyframes,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Edit as EditIcon,
    Cake,
    DeleteForever,
    Language,
    PlayCircleOutline,
} from '@mui/icons-material';

import { deleteMovie, getMovieById } from '../../store/thunks/moviesThunks';
import {
    clearCurrentMovie,
    setMovieForEdit,
} from '../../store/slices/moviesSlice';
import Loader from '../../components/UI/Loader';
import ErrorMessage from '../../components/UI/ErrorMessage';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDrawer from '../../components/UI/ConfirmDrawer';
import MovieTrailerModal from '../../components/UI/MovieTrailerModal';

// Створюємо ефект пульсації за допомогою Keyframes
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
  70% { transform: scale(1.03); box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
`;

function MovieDetailsPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const currentMovie = useSelector((state) => state.moviesList.currentMovie);
    const error = useSelector((state) => state.moviesList.error);
    const isPending = useSelector((state) => state.moviesList.isPending);

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
        dispatch(setMovieForEdit(structuredClone(currentMovie)));
        navigate(`/movies/${id}/edit`);
    };

    if ((!currentMovie && !error) || isPending) {
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
                        p: { xs: 2, md: 3 },
                        borderRadius: 5,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Grid container spacing={3} alignItems='stretch'>
                        {/* Movie's photo */}
                        <Grid size={{ xs: 12, md: 4.5 }}>
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
                            size={{ xs: 12, md: 7.5 }}
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

                                <Box sx={{ display: 'flex', gap: 1.5 }}>
                                    <Button
                                        variant={
                                            location.pathname.includes('edit')
                                                ? 'disabled'
                                                : 'contained'
                                        }
                                        size='medium'
                                        startIcon={<EditIcon />}
                                        onClick={handleEditClick}
                                        sx={{
                                            boxShadow:
                                                '0 4px 14px 0 rgba(0,118,255,0.39)',
                                        }}
                                    >
                                        {location.pathname.includes('edit')
                                            ? 'Editing...'
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
                                    <Button
                                        variant='contained'
                                        size='medium'
                                        startIcon={<PlayCircleOutline />}
                                        onClick={() => setIsTrailerOpen(true)}
                                        sx={{
                                            background:
                                                'linear-gradient(45deg, #1a237e 30%, #2196F3 90%)',
                                            boxShadow:
                                                '0 4px 14px 0 rgba(0,118,255,0.39)',
                                            animation: `${pulse} 2s infinite`, // Застосування анімації
                                            fontWeight: 'bold',
                                            px: 3,
                                        }}
                                    >
                                        Watch Trailer
                                    </Button>
                                </Box>
                            </Box>
                            <Divider sx={{ my: 2, opacity: 0.6 }} />

                            {/* Movie's details */}
                            <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
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
                                            Release Date
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {currentMovie.releaseDate}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontWeight: 'bold',
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
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontWeight: 'bold',
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
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            fontWeight: 'bold',
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
                                        {currentMovie.studios.map(
                                            (studio, i) => (
                                                <Chip
                                                    key={i}
                                                    label={studio}
                                                    sx={{
                                                        borderRadius: '12px',
                                                        fontWeight: 500,
                                                    }}
                                                />
                                            ),
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            {/* Компонент модального вікна трейлера */}
            <MovieTrailerModal
                open={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
                trailerUrl={currentMovie.trailerUrl} // Припускаємо, що це поле є в моделі
            />

            <ConfirmDrawer
                open={open}
                title='Delete movie'
                description={`Are you sure you want to delete ${currentMovie.title}? This action cannot be undone.`}
                confirmText='Delete'
                cancelText='Cancel'
                onConfirm={handleConfirmDelete}
                onClose={closeConfirm}
            />
        </>
    );
}

export default MovieDetailsPage;
