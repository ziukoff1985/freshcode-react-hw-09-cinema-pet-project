import Stack from '@mui/material/Stack';
import { Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import ActorsList from '../../components/Lists/ActorsList';
import ActorDetailsPage from './ActorDetailsPage';
import { Typography } from '@mui/material';

function ActorsPage() {
    return (
        <>
            <Stack
                sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        fontWeight: 'bold',
                        mb: 0,
                        color: 'primary.main',
                    }}
                >
                    Actors
                </Typography>
                <Link to='/actors/new'>
                    <Button
                        variant='contained'
                        color='success'
                        startIcon={<LibraryAddIcon />}
                        size='small'
                    >
                        Add actor
                    </Button>
                </Link>
            </Stack>
            <Routes>
                <Route index element={<ActorsList />} />
                <Route path='new' element={<ActorsList />} />
                <Route path=':id' element={<ActorDetailsPage />} />
                <Route path=':id/edit' element={<ActorDetailsPage />} />
            </Routes>
        </>
    );
}

export default ActorsPage;
