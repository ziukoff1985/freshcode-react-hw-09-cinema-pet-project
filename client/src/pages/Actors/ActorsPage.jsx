import Stack from '@mui/material/Stack';
import { Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';

import ActorsList from '../../components/Lists/ActorsList';
import ActorDetailsPage from './ActorDetailsPage';

function ActorsPage() {
    return (
        <>
            <Stack>
                <Link to='/actors/new'>
                    <Button>Add actor</Button>
                </Link>
            </Stack>
            <Stack>
                <Link to='/actors/1/edit'>
                    <Button>Edit actor</Button>
                </Link>
            </Stack>
            <div>ActorsPage</div>
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
