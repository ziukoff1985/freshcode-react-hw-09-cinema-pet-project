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
import { deleteStudio, getAllStudios } from '../../store/thunks/studiosThunks';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDrawer from '../UI/ConfirmDrawer';
import { setStudioForEdit } from '../../store/slices/studiosSlice';

function StudiosList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const studios = useSelector((state) => state.studiosList.studios);
    const isPending = useSelector((state) => state.studiosList.isPending);

    useEffect(() => {
        dispatch(getAllStudios());
    }, [dispatch]);

    const { open, payload, openConfirm, closeConfirm } = useConfirm();

    const handleDeleteClick = (id) => {
        openConfirm(id);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteStudio(payload));
        closeConfirm();
    };

    const handleEditClick = (id) => {
        const currentStudio = studios.find((studio) => studio.id === id);
        dispatch(setStudioForEdit(structuredClone(currentStudio)));
        navigate(`/studios/${id}/edit`);
    };

    if (!studios || isPending)
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
                    {studios.map((studio, index) => (
                        <Box key={studio.id}>
                            <ListItem
                                alignItems='flex-start'
                                secondaryAction={
                                    <Box>
                                        <Tooltip title='Show details'>
                                            <IconButton
                                                onClick={() => {
                                                    navigate(
                                                        `/studios/${studio.id}`,
                                                    );
                                                }}
                                                color='primary'
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Edit'>
                                            <IconButton
                                                // onClick={() =>
                                                //     navigate(
                                                //         `/studios/${studio.id}/edit`,
                                                //     )
                                                // }
                                                onClick={() =>
                                                    handleEditClick(studio.id)
                                                }
                                                color='secondary'
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete'>
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteClick(studio.id)
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
                                        alt={`${studio.title}`}
                                        src={studio.logo}
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
                                            {`${studio.title}`}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                component='span'
                                                variant='body2'
                                                color='text.primary'
                                            >
                                                {studio.location}
                                            </Typography>
                                            {` — Foundation year: ${studio.foundationYear}`}
                                        </>
                                    }
                                />
                            </ListItem>
                            {index < studios.length - 1 && (
                                <Divider variant='inset' component='li' />
                            )}
                        </Box>
                    ))}
                </List>
            </Paper>

            <ConfirmDrawer
                open={open}
                title='Delete studio'
                description='Are you sure you want to delete this studio? This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                onConfirm={handleConfirmDelete}
                onClose={closeConfirm}
            />
        </>
    );
}

export default StudiosList;
