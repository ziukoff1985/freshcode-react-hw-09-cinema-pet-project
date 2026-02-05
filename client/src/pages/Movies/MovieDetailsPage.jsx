import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Chip,
    Divider,
    CircularProgress,
    Card,
    CardMedia,
    alpha,
    Avatar,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Edit as EditIcon,
    Cake,
    Language,
} from '@mui/icons-material';
import { getMovieById } from '../../store/thunks/moviesThunks';

function MovieDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentMovie, isPending } = useSelector(
        (state) => state.moviesList,
    );

    useEffect(() => {
        dispatch(getMovieById(id));
    }, [dispatch, id]);

    if (isPending)
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                }}
            >
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    if (!currentMovie)
        return (
            <Typography variant='h5' sx={{ p: 4, textAlign: 'center' }}>
                Movie not found
            </Typography>
        );
    return (
        <Box sx={{ p: { xs: 1, md: 3 }, maxWidth: 1200, mx: 'auto' }}>
            {/* Кнопка назад з ефектом підсвічування */}
            <Button
                startIcon={<BackIcon />}
                onClick={() => navigate('/movies')}
                sx={{
                    mb: 3,
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: (theme) =>
                            alpha(theme.palette.primary.main, 0.1),
                    },
                }}
            >
                Back to movies list
            </Button>

            <Paper
                elevation={6}
                sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 5,
                    background:
                        'linear-gradient(135deg, #ffffff 0%, #f9faff 100%)', // Ніжний градієнт
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Декоративний елемент на фоні */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 200,
                        height: 200,
                        borderRadius: '50%',
                        background: (theme) =>
                            alpha(theme.palette.primary.main, 0.03),
                    }}
                />

                <Grid container spacing={5} alignItems='stretch'>
                    {/* ФОТО АКТОРА З ТІННЮ ТА ЕФЕКТОМ */}
                    <Grid size={{ xs: 12, md: 4.5 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)', // Глибока тінь
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': { transform: 'scale(1.02)' }, // Легке збільшення
                                lineHeight: 0,
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

                    {/* БЛОК ІНФОРМАЦІЇ */}
                    <Grid
                        size={{ xs: 12, md: 7.5 }}
                        sx={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: 2,
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
                                            xs: '2.5rem',
                                            md: '3.5rem',
                                        },
                                        // Градієнт на тексті
                                        background:
                                            'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {currentMovie.title}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    width: '100%',
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
                                        gap: 1.5,
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
                                                    backgroundColor: (theme) =>
                                                        alpha(
                                                            theme.palette
                                                                .primary.main,
                                                            0.08,
                                                        ),
                                                    border: '1px solid',
                                                    borderColor: (theme) =>
                                                        alpha(
                                                            theme.palette
                                                                .primary.main,
                                                            0.2,
                                                        ),
                                                    '&:hover': {
                                                        backgroundColor: (
                                                            theme,
                                                        ) =>
                                                            alpha(
                                                                theme.palette
                                                                    .primary
                                                                    .main,
                                                                0.15,
                                                            ),
                                                    },
                                                }}
                                            />
                                        ),
                                    )}
                                </Box>
                            </Box>

                            <Button
                                variant='contained'
                                startIcon={<EditIcon />}
                                onClick={() => navigate('edit')}
                                sx={{
                                    borderRadius: 3,
                                    px: 3,
                                    py: 1,
                                    boxShadow:
                                        '0 4px 14px 0 rgba(0,118,255,0.39)',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                Edit Profile
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3, opacity: 0.6 }} />

                        {/* Картки швидкої інфо */}
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
                                        color: '#1a237e',
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
                                        color: '#1a237e',
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

                        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                            <Typography
                                variant='h6'
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    color: 'primary.main',
                                }}
                            >
                                Actors
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1.5,
                                }}
                            >
                                {currentMovie.actors.map((movie, idx) => (
                                    <Chip
                                        key={idx}
                                        label={movie}
                                        sx={{
                                            borderRadius: '12px',
                                            fontWeight: 500,
                                            backgroundColor: (theme) =>
                                                alpha(
                                                    theme.palette.primary.main,
                                                    0.08,
                                                ),
                                            border: '1px solid',
                                            borderColor: (theme) =>
                                                alpha(
                                                    theme.palette.primary.main,
                                                    0.2,
                                                ),
                                            '&:hover': {
                                                backgroundColor: (theme) =>
                                                    alpha(
                                                        theme.palette.primary
                                                            .main,
                                                        0.15,
                                                    ),
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default MovieDetailsPage;
