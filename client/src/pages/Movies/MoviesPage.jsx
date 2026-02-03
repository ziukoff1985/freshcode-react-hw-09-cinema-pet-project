import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import MoviesList from '../../components/Lists/MoviesList';

function MoviesPage() {
    return (
        <>
            <Stack>
                <Link to='/movies/new'>
                    <Button>Add movie</Button>
                </Link>
            </Stack>
            <div>MoviesPage</div>
            <MoviesList />
        </>
    );
}

export default MoviesPage;
