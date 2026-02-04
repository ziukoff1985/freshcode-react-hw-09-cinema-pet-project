import Stack from '@mui/material/Stack';
import { Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';

import DirectorsList from '../../components/Lists/DirectorsList';
import DirectorDetailsPage from './DirectorDetailsPage';

function DirectorsPage() {
    return (
        <>
            <Stack>
                <Link to='/directors/new'>
                    <Button>Add director</Button>
                </Link>
            </Stack>
            <Stack>
                <Link to='/directors/1/edit'>
                    <Button>Edit director</Button>
                </Link>
            </Stack>
            <div>DirectorsPage</div>
            <Routes>
                <Route index element={<DirectorsList />} />
                <Route path='new' element={<DirectorsList />} />
                <Route path=':id' element={<DirectorDetailsPage />} />
                <Route path=':id/edit' element={<DirectorDetailsPage />} />
            </Routes>
        </>
    );
}

export default DirectorsPage;
