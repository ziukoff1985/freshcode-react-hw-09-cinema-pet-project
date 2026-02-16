import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
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

import { deleteStudio, getStudioById } from '../../store/thunks/studiosThunks';
import {
    clearCurrentStudio,
    setStudioForEdit,
} from '../../store/slices/studiosSlice';
import Loader from '../../components/UI/Loader';
import ErrorMessage from '../../components/UI/ErrorMessage';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDrawer from '../../components/UI/ConfirmDrawer';

function StudioDetailsPage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentStudio = useSelector(
        (state) => state.studiosList.currentStudio,
    );
    const error = useSelector((state) => state.studiosList.error);
    const isPending = useSelector((state) => state.studiosList.isPending);

    useEffect(() => {
        dispatch(getStudioById(id));
        return () => {
            dispatch(clearCurrentStudio());
        };
    }, [dispatch, id]);

    const { open, payload, openConfirm, closeConfirm } = useConfirm();

    const handleDeleteClick = () => {
        openConfirm(id);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteStudio(payload));
        closeConfirm();
        navigate('/studios');
    };

    const handleEditClick = () => {
        dispatch(setStudioForEdit(structuredClone(currentStudio)));
        navigate(`/studios/${id}/edit`);
    };

    if ((!currentStudio && !error) || isPending) {
        return <Loader />;
    }
    if (error) {
        return (
            <ErrorMessage
                error={error}
                btnText='Back to studios list'
                to='/studios'
            />
        );
    }

    return (
        <>
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
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
                        p: { xs: 2, md: 3 },
                        borderRadius: 5,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Grid container spacing={5} alignItems='stretch'>
                        {/* Stuio's logo */}
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

                        {/* Studio's info */}
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

                                <Box sx={{ display: 'flex', gap: 2 }}>
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

                            <Divider sx={{ my: 3, opacity: 0.6 }} />

                            {/* Studio's details */}
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
                                            Location
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
                                            Foundation Date
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {currentStudio.foundationDate}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{ display: 'flex', gap: 1, width: '100%' }}
                            >
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
            <ConfirmDrawer
                open={open}
                title='Delete movie'
                description={`Are you sure you want to delete ${currentStudio.title}? This action cannot be undone.`}
                confirmText='Delete'
                cancelText='Cancel'
                onConfirm={handleConfirmDelete}
                onClose={closeConfirm}
            />
        </>
    );
}

export default StudioDetailsPage;
