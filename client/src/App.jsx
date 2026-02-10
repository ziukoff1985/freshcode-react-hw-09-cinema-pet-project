import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/Movies/MoviesPage';
import ActorsPage from './pages/Actors/ActorsPage';
import DirectorsPage from './pages/Directors/DirectorsPage';
import StudiosPage from './pages/Studios/StudiosPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path='/*' Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='movies/*' element={<MoviesPage />} />
                <Route path='actors/*' element={<ActorsPage />} />
                <Route path='directors/*' element={<DirectorsPage />} />
                <Route path='studios/*' element={<StudiosPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
