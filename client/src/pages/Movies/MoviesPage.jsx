import Stack from '@mui/material/Stack';
import { Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';

import MoviesList from '../../components/Lists/MoviesList';
import MovieDetailsPage from './MovieDetailsPage';

function MoviesPage() {
    return (
        <>
            <Stack>
                <Link to='/movies/new'>
                    <Button>Add movie</Button>
                </Link>
            </Stack>
            {/* <Stack>
                <Link to='/movies/1/edit'>
                    <Button>Edit movie</Button>
                </Link>
            </Stack>
            <div>MoviesPage</div> */}
            <Routes>
                <Route index element={<MoviesList />} />
                <Route path='new' element={<MoviesList />} />
                <Route path=':id' element={<MovieDetailsPage />} />
                <Route path=':id/edit' element={<MovieDetailsPage />} />
            </Routes>
        </>
    );
}

export default MoviesPage;
