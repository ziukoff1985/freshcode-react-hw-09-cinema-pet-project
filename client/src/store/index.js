import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import moviesReducer from './slices/moviesSlice';
import actorsReducer from './slices/actorsSlice';
import studiosReducer from './slices/studiosSlice';
import directorsReducer from './slices/directorsSlice';

export default configureStore({
    reducer: {
        moviesList: moviesReducer,
        actorsList: actorsReducer,
        studiosList: studiosReducer,
        directorsList: directorsReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
