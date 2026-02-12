import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Link, Route, Routes } from 'react-router-dom';

import StudiosList from '../../components/Lists/StudiosList';
import StudioDetailsPage from './StudioDetailsPage';
import { Typography } from '@mui/material';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useDispatch } from 'react-redux';
import { EMPTY_STUDIO_DATA } from '../../constants/constants';
import { setStudioForEdit } from '../../store/slices/studiosSlice';

function StudiosPage() {
    const dispatch = useDispatch();

    const handleAddNewStudio = () => {
        dispatch(setStudioForEdit(EMPTY_STUDIO_DATA));
    };

    return (
        <>
            <Stack
                sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
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
                        onClick={handleAddNewStudio}
                        variant='contained'
                        color='success'
                        startIcon={<LibraryAddIcon />}
                        size='medium'
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
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default StudiosPage;
