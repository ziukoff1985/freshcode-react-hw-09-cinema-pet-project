import { Routes, Route } from 'react-router-dom';
import { useMemo, useState } from 'react';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/Movies/MoviesPage';
import ActorsPage from './pages/Actors/ActorsPage';
import DirectorsPage from './pages/Directors/DirectorsPage';
import StudiosPage from './pages/Studios/StudiosPage';
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
                    <Route path='movies/*' element={<MoviesPage />} />
                    <Route path='actors/*' element={<ActorsPage />} />
                    <Route path='directors/*' element={<DirectorsPage />} />
                    <Route path='studios/*' element={<StudiosPage />} />
                </Route>
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
