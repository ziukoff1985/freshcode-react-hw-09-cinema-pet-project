import { Route, Routes } from 'react-router-dom';
import MoviesForm from '../Forms/MoviesForm';
import ActorsForm from '../Forms/ActorsForm';
import DirectorsForm from '../Forms/DirectorsForm';
import StudiosForm from '../Forms/StudiosForm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function CinemaService() {
    return (
        <Box sx={{ p: 2, fontSize: '24px' }}>
            <h2 style={{ fontSize: '32px' }}>Cinema Service</h2>
            <Routes>
                <Route path='/movies/new' element={<MoviesForm />} />
                <Route path='/movies/:id/edit' element={<MoviesForm />} />
                <Route path='/actors/new' element={<ActorsForm />} />
                <Route path='/actors/:id/edit' element={<ActorsForm />} />
                <Route path='/directors/new' element={<DirectorsForm />} />
                <Route path='/directors/:id/edit' element={<DirectorsForm />} />
                <Route path='/studios/new' element={<StudiosForm />} />
                <Route path='/studios/:id/edit' element={<StudiosForm />} />
                <Route
                    path='*'
                    element={
                        <Typography variant='body2' color='text.secondary'>
                            Please choose an element for editing or click on
                            'Add' button
                        </Typography>
                    }
                />
            </Routes>
        </Box>
    );
}

export default CinemaService;
