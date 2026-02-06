import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link, Route, Routes } from 'react-router-dom';

import StudiosList from '../../components/Lists/StudiosList';
import StudioDetailsPage from './StudioDetailsPage';
import { Typography } from '@mui/material';

function StudiosPage() {
    return (
        <>
            <Stack
                sx={{ alignItems: 'center' }}
                direction='row'
                justifyContent='space-between'
            >
                <Typography
                    variant='h6'
                    sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: 'primary.main',
                    }}
                >
                    Studios
                </Typography>
                <Link to='/studios/new'>
                    <Button>Add studio</Button>
                </Link>
            </Stack>
            {/* <Stack>
                <Link to='/studios/1/edit'>
                    <Button>Edit studio</Button>
                </Link>
            </Stack>
            <div>StudiosPage</div> */}
            <Routes>
                <Route index element={<StudiosList />} />
                <Route path='new' element={<StudiosList />} />
                <Route path=':id' element={<StudioDetailsPage />} />
                <Route path=':id/edit' element={<StudioDetailsPage />} />
            </Routes>
        </>
    );
}

export default StudiosPage;
