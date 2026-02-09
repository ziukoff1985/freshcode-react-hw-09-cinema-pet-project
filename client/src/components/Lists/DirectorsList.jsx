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
import {
    deleteDirector,
    getAllDirectors,
} from '../../store/thunks/directorsThunks';
import useConfirm from '../../hooks/useConfirm';
import ConfirmDrawer from '../UI/ConfirmDrawer';

function DirectorsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const directors = useSelector((state) => state.directorsList.directors);
    const isPending = useSelector((state) => state.directorsList.isPending);

    useEffect(() => {
        dispatch(getAllDirectors());
    }, [dispatch]);

    const { open, payload, openConfirm, closeConfirm } = useConfirm();

    const handleDeleteClick = (id) => {
        openConfirm(id);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteDirector(payload));
        closeConfirm();
    };

    if (!directors || isPending)
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
                    {directors.map((director, index) => (
                        <Box key={director.id}>
                            <ListItem
                                alignItems='flex-start'
                                secondaryAction={
                                    <Box>
                                        <Tooltip title='Show details'>
                                            <IconButton
                                                component={Link}
                                                to={`${director.id}`}
                                                color='primary'
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Edit'>
                                            <IconButton
                                                onClick={() =>
                                                    navigate(
                                                        `${director.id}/edit`,
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
                                                    handleDeleteClick(
                                                        director.id,
                                                    )
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
                                        alt={`${director.firstName} ${director.lastName}`}
                                        src={director.image}
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
                                            {`${director.firstName} ${director.lastName}`}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                component='span'
                                                variant='body2'
                                                color='text.primary'
                                            >
                                                {director.nationality}
                                            </Typography>
                                            {` — Birth date: ${director.birthDate}`}
                                        </>
                                    }
                                />
                            </ListItem>
                            {index < directors.length - 1 && (
                                <Divider variant='inset' component='li' />
                            )}
                        </Box>
                    ))}
                </List>
            </Paper>

            <ConfirmDrawer
                open={open}
                title='Delete director'
                description='Are you sure you want to delete this director? This action cannot be undone.'
                confirmText='Delete'
                cancelText='Cancel'
                onConfirm={handleConfirmDelete}
                onClose={closeConfirm}
            />
        </>
    );
}

export default DirectorsList;
