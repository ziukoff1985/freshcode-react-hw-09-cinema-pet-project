import { Routes, Route } from 'react-router-dom';
import { useMemo, useState } from 'react';

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

import { getAppTheme } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

function App() {
    const [mode, setMode] = useState('light');

    const theme = useMemo(() => getAppTheme(mode), [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                <Route
                    path='/*'
                    element={
                        <Layout toggleMode={toggleColorMode} mode={mode} />
                    }
                >
                    <Route index element={<HomePage />} />
                    <Route path='movies'>
                        <Route index element={<MoviesPage />} />
                        <Route path='new' element={<MoviesPage />} />
                        <Route path=':id'>
                            <Route index element={<MovieDetailsPage />} />
                            <Route path='edit' element={<MovieDetailsPage />} />
                        </Route>
                    </Route>
                    <Route path='actors'>
                        <Route index element={<ActorsPage />} />
                        <Route path='new' element={<ActorsPage />} />
                        <Route path=':id'>
                            <Route index element={<ActorDetailsPage />} />
                            <Route path='edit' element={<ActorDetailsPage />} />
                        </Route>
                    </Route>
                    <Route path='directors'>
                        <Route index element={<DirectorsPage />} />
                        <Route path='new' element={<DirectorsPage />} />
                        <Route path=':id'>
                            <Route index element={<DirectorDetailsPage />} />
                            <Route
                                path='edit'
                                element={<DirectorDetailsPage />}
                            />
                        </Route>
                    </Route>
                    <Route path='studios'>
                        <Route index element={<StudiosPage />} />
                        <Route path='new' element={<StudiosPage />} />
                        <Route path=':id'>
                            <Route index element={<StudioDetailsPage />} />
                            <Route
                                path='edit'
                                element={<StudioDetailsPage />}
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
