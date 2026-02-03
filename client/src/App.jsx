import { Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/Movies/MoviesPage';
import MovieDetailsPage from './pages/Movies/MovieDetailsPage';
import ActorsPage from './pages/Actors/ActorsPage';
import ActorDetailsPage from './pages/Actors/ActorDetailsPage';
import DirectorsPage from './pages/Directors/DirectorsPage';
import DirectorDetailsPage from './pages/Directors/DirectorDetailsPage';
import StudiosPage from './pages/Studios/StudiosPage';
import StudioDetailsPage from './pages/Studios/StudioDetailsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
    return (
        <Routes>
            <Route path='/*' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='movies' element={<MoviesPage />} />
                <Route path='movies/:id' element={<MovieDetailsPage />} />
                <Route path='actors' element={<ActorsPage />} />
                <Route path='actors/:id' element={<ActorDetailsPage />} />
                <Route path='directors' element={<DirectorsPage />} />
                <Route path='directors/:id' element={<DirectorDetailsPage />} />
                <Route path='studios' element={<StudiosPage />} />
                <Route path='studios/:id' element={<StudioDetailsPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
