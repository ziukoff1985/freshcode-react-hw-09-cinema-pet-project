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
import { deleteStudio, getAllStudios } from '../../store/thunks/studiosThunks';

function StudiosList() {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [selectedStudioId, setSelectedStudioId] = useState(null);

    const handleOpenDeleteConfirm = (id) => {
        setOpenConfirm(true);
        setSelectedStudioId(id);
    };

    const handleCloseDeleteConfirm = () => {
        setOpenConfirm(false);
        setSelectedStudioId(null);
    };

    const handleDelete = () => {
        if (selectedStudioId) {
            dispatch(deleteStudio(selectedStudioId));
        }
        handleCloseDeleteConfirm();
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { studios, isPending } = useSelector((state) => state.studiosList);

    useEffect(() => {
        dispatch(getAllStudios());
    }, [dispatch]);

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
                                                    handleOpenDeleteConfirm(
                                                        studio.id,
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
                        ❗ Warning
                    </Typography>

                    <Typography variant='body2' color='text.secondary' mb={3}>
                        Are you sure you want to delete? This action cannot be
                        undone.
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

export default StudiosList;
