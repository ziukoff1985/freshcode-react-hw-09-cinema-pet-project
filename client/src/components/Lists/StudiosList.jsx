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
import { deleteStudio, getAllStudios } from '../../store/thunks/studiosThunks';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDrawer from '../UI/ConfirmDrawer';

function StudiosList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const studios = useSelector((state) => state.studiosList.studios);
    const isPending = useSelector((state) => state.studiosList.isPending);

    useEffect(() => {
        dispatch(getAllStudios());
    }, [dispatch]);

    const confirm = useConfirm();

    const handleDeleteClick = (id) => {
        confirm.openConfirm(id);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteStudio(confirm.payload));
        confirm.closeConfirm();
    };

    if (!studios || isPending)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );

    return (
        <>
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
                                                component={Link}
                                                to={`${studio.id}`}
                                                color='primary'
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Edit'>
                                            <IconButton
                                                onClick={() =>
                                                    navigate(
                                                        `${studio.id}/edit`,
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
                open={confirm.open}
                title='Delete studio'
                description='Are you sure you want to delete studio? This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                onConfirm={handleConfirmDelete}
                onClose={confirm.closeConfirm}
            />
        </>
    );
}

export default StudiosList;
