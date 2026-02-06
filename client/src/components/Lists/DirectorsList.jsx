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

function DirectorsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { directors, isPending, error } = useSelector(
        (state) => state.directorsList,
    );

    useEffect(() => {
        dispatch(getAllDirectors());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this director?')) {
            dispatch(deleteDirector(id));
        }
    };

    if (isPending)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
                <CircularProgress size={60} thickness={4} />
            </Box>
        );
    if (error) return <Typography color='error'>Error: {error}</Typography>;

    return (
        <Paper
            elevation={2}
            sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2 }}
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
                                                navigate(`${director.id}/edit`)
                                            }
                                            color='secondary'
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete'>
                                        <IconButton
                                            onClick={() =>
                                                handleDelete(director.id)
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
                                            fontSize: '1.1rem',
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
    );
}

export default DirectorsList;
