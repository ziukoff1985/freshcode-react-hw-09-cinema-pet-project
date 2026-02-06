import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Link, Route, Routes } from 'react-router-dom';

import StudiosList from '../../components/Lists/StudiosList';
import StudioDetailsPage from './StudioDetailsPage';
import { Typography } from '@mui/material';

function StudiosPage() {
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
                    Studios
                </Typography>
                <Link to='/studios/new'>
                    <Button
                        variant='contained'
                        color='success'
                        startIcon={<LibraryAddIcon />}
                        size='small'
                    >
                        Add studio
                    </Button>
                </Link>
            </Stack>
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
