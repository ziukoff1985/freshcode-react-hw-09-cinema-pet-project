import { useEffect, useState } from 'react';
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
    Drawer,
    Button,
    Stack,
} from '@mui/material';
import {
    Visibility as ViewIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import { getAllActors, deleteActor } from '../../store/thunks/actorsThunks';

function ActorsList() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedActorId, setSelectedActorId] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { actors, isPending } = useSelector((state) => state.actorsList);

    useEffect(() => {
        dispatch(getAllActors());
    }, [dispatch]);

    const handleOpenDeleteConfirm = (actorId) => {
        setOpenConfirm(true);
        setSelectedActorId(actorId);
    };

    const handleCloseDeleteConfirm = () => {
        setOpenConfirm(false);
        setSelectedActorId(null);
    };

    const handleDelete = () => {
        if (selectedActorId) {
            dispatch(deleteActor(selectedActorId));
        }
        handleCloseDeleteConfirm();
    };

    if (!actors || isPending)
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
                    {actors.map((actor, index) => (
                        <Box key={actor.id}>
                            <ListItem
                                alignItems='flex-start'
                                secondaryAction={
                                    <Box>
                                        <Tooltip title='Show details'>
                                            <IconButton
                                                component={Link}
                                                to={`${actor.id}`}
                                                color='primary'
                                            >
                                                <ViewIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Edit'>
                                            <IconButton
                                                onClick={() =>
                                                    navigate(`${actor.id}/edit`)
                                                }
                                                color='secondary'
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Delete'>
                                            <IconButton
                                                onClick={() =>
                                                    handleOpenDeleteConfirm(
                                                        actor.id,
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
                                        alt={`${actor.firstName} ${actor.lastName}`}
                                        src={actor.image}
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
                                            {`${actor.firstName} ${actor.lastName}`}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography
                                                component='span'
                                                variant='body2'
                                                color='text.primary'
                                            >
                                                {actor.nationality}
                                            </Typography>
                                            {` — Birth date: ${actor.birthDate}`}
                                        </>
                                    }
                                />
                            </ListItem>
                            {index < actors.length - 1 && (
                                <Divider variant='inset' component='li' />
                            )}
                        </Box>
                    ))}
                </List>
            </Paper>

            <Drawer
                anchor='right' // або 'bottom'
                open={openConfirm}
                onClose={handleCloseDeleteConfirm}
            >
                <Box
                    sx={{
                        width: { xs: '100vw', sm: 360 },
                        p: 3,
                    }}
                >
                    <Typography variant='h6' gutterBottom>
                        Delete movie
                    </Typography>

                    <Typography variant='body2' color='text.secondary' mb={3}>
                        Are you sure you want to delete this actor? This action
                        cannot be undone.
                    </Typography>

                    <Stack
                        direction='row'
                        spacing={2}
                        justifyContent='flex-end'
                    >
                        <Button onClick={handleCloseDeleteConfirm}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant='contained'
                            color='error'
                        >
                            Delete
                        </Button>
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
}

export default ActorsList;
