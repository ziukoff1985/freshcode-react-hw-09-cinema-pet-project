import { Link, Route, Routes } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Typography from '@mui/material/Typography';

import MoviesList from '../../components/Lists/MoviesList';
import MovieDetailsPage from './MovieDetailsPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function MoviesPage() {
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
                    Movies
                </Typography>
                <Link to='/movies/new'>
                    <Button
                        variant='contained'
                        color='success'
                        startIcon={<LibraryAddIcon />}
                        size='medium'
                    >
                        Add movie
                    </Button>
                </Link>
            </Stack>
            <Routes>
                <Route index element={<MoviesList />} />
                <Route path='new' element={<MoviesList />} />
                <Route path=':id' element={<MovieDetailsPage />} />
                <Route path=':id/edit' element={<MovieDetailsPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default MoviesPage;
