import Stack from '@mui/material/Stack';
import { Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import DirectorsList from '../../components/Lists/DirectorsList';
import DirectorDetailsPage from './DirectorDetailsPage';
import { Typography } from '@mui/material';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useDispatch } from 'react-redux';
import { setDirectorForEdit } from '../../store/slices/directorsSlice';
import { EMPTY_DIRECTOR_DATA } from '../../constants/constants';

function DirectorsPage() {
    const dispatch = useDispatch();
    const handleAddNewDirector = () => {
        dispatch(setDirectorForEdit(EMPTY_DIRECTOR_DATA));
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
                    Directors
                </Typography>
                <Link to='/directors/new'>
                    <Button
                        onClick={handleAddNewDirector}
                        variant='contained'
                        color='success'
                        startIcon={<LibraryAddIcon />}
                        size='medium'
                    >
                        Add director
                    </Button>
                </Link>
            </Stack>
            <Routes>
                <Route index element={<DirectorsList />} />
                <Route path='new' element={<DirectorsList />} />
                <Route path=':id' element={<DirectorDetailsPage />} />
                <Route path=':id/edit' element={<DirectorDetailsPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default DirectorsPage;
