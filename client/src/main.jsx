import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

import App from './App.jsx';
import store from './store/index.js';
import { ThemeContextProvider } from './context/ThemeContextProvider.jsx';

import './index.css';
import 'modern-normalize';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeContextProvider>
                <BrowserRouter>
                    <CssBaseline />
                    <App />
                </BrowserRouter>
            </ThemeContextProvider>
        </Provider>
    </StrictMode>,
);
