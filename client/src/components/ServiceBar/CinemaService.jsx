import { Route, Routes } from 'react-router-dom';
import MoviesForm from '../Forms/MoviesForm';
import ActorsForm from '../Forms/ActorsForm';
import DirectorsForm from '../Forms/DirectorsForm';
import StudiosForm from '../Forms/StudiosForm';

function CinemaService() {
    return (
        <>
            <h2>Cinema Service</h2>
            <Routes>
                <Route path='/movies/new' element={<MoviesForm />} />
                <Route path='/movies/:id/edit' element={<MoviesForm />} />
                <Route path='/actors/new' element={<ActorsForm />} />
                <Route path='/actors/:id/edit' element={<ActorsForm />} />
                <Route path='/directors/new' element={<DirectorsForm />} />
                <Route path='/directors/:id/edit' element={<DirectorsForm />} />
                <Route path='/studios/new' element={<StudiosForm />} />
                <Route path='/studios/:id/edit' element={<StudiosForm />} />
            </Routes>
        </>
    );
}

export default CinemaService;
