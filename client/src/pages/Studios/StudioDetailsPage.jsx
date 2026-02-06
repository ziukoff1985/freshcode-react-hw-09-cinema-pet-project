import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
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
import { getStudioById } from '../../store/thunks/studiosThunks';

function StudioDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentStudio, isPending } = useSelector(
        (state) => state.studiosList,
    );

    useEffect(() => {
        dispatch(getStudioById(id));
    }, [dispatch, id]);

    if (isPending)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress />
            </Box>
        );

    if (!currentStudio)
        return (
            <Typography variant='h5' sx={{ p: 4, textAlign: 'center' }}>
                Studio not found
            </Typography>
        );
    return (
        <Box sx={{ /* p: { xs: 1, md: 3 }, */ maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/studios')}
                    sx={{
                        mb: 1,
                        borderRadius: 2,
                        textTransform: 'none',
                    }}
                >
                    Back to studios list
                </Button>
            </Box>

            <Paper
                elevation={6}
                sx={{
                    p: { xs: 2, md: 4 },
                    borderRadius: 5,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Grid container spacing={5} alignItems='stretch'>
                    {/* ФОТО АКТОРА З ТІННЮ ТА ЕФЕКТОМ */}
                    <Grid size={{ xs: 12, md: 4.5 }}>
                        <Card
                            sx={{
                                borderRadius: 4,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            }}
                        >
                            <CardMedia
                                component='img'
                                image={currentStudio.logo}
                                alt={currentStudio.title}
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
                                gap: 1,
                            }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Typography
                                    variant='h2'
                                    sx={{
                                        fontWeight: 900,
                                        textAlign: 'left',
                                        color: 'text.primary',
                                        letterSpacing: '-0.02em',

                                        fontSize: {
                                            xs: '24px',
                                            md: '36px',
                                        },
                                    }}
                                >
                                    {currentStudio.title}
                                </Typography>
                            </Box>

                            <Button
                                variant={
                                    location.pathname.includes('edit')
                                        ? 'disabled'
                                        : 'contained'
                                }
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
                                        {currentStudio.location}
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
                                        Foundation Year
                                    </Typography>
                                    <Typography
                                        variant='body1'
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {currentStudio.foundationYear}
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
                                Movies:
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1.5,
                                }}
                            >
                                {currentStudio.movies.map((movie, i) => (
                                    <Chip
                                        key={i}
                                        label={movie}
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
    );
}

export default StudioDetailsPage;
