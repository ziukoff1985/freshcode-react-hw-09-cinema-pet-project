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

function StudiosList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { studios, isPending, error } = useSelector(
        (state) => state.studiosList,
    );

    useEffect(() => {
        dispatch(getAllStudios());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this studio?')) {
            dispatch(deleteStudio(id));
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
            <Box
                sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}
            >
                <Typography
                    variant='h5'
                    component='div'
                    sx={{ fontWeight: 'bold' }}
                >
                    Studios
                </Typography>
            </Box>
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
                                                navigate(`${studio.id}/edit`)
                                            }
                                            color='secondary'
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete'>
                                        <IconButton
                                            onClick={() =>
                                                handleDelete(studio.id)
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
                                            fontSize: '1.1rem',
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
    );
}

export default StudiosList;
