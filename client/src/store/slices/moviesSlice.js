import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { MOVIES_SLICE_NAME, EMPTY_MOVIE_DATA } from '../../constants/constants';
import {
    createMovie,
    deleteMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
} from '../thunks/moviesThunks';

const initialState = {
    movies: [],
    currentMovie: null,
    movieForEdit: EMPTY_MOVIE_DATA,
    isPending: false,
    error: null,
};

const setIsPending = (state) => {
    state.isPending = true;
    state.error = null;
};

const setError = (state, action) => {
    state.isPending = false;
    state.error = action.payload;
};

const moviesSlice = createSlice({
    name: MOVIES_SLICE_NAME,
    initialState,
    reducers: {
        setMovieForEdit: (state, action) => {
            state.movieForEdit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.movies = action.payload;
            })
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.currentMovie = action.payload;
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.movies.push(action.payload);
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.movies = state.movies.map((movie) =>
                    movie.id === action.payload.id ? action.payload : movie,
                );
                state.currentMovie = action.payload;
                state.movieForEdit = action.payload;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.movies = state.movies.filter(
                    (movie) => movie.id !== action.payload,
                );
                state.currentMovie = null;
                state.movieForEdit =
                    state.movieForEdit.id === action.payload
                        ? EMPTY_MOVIE_DATA
                        : state.movieForEdit;
            })
            .addMatcher(
                isAnyOf(
                    getAllMovies.pending,
                    getMovieById.pending,
                    createMovie.pending,
                    updateMovie.pending,
                    deleteMovie.pending,
                ),
                setIsPending,
            )
            .addMatcher(
                isAnyOf(
                    getAllMovies.rejected,
                    getMovieById.rejected,
                    createMovie.rejected,
                    updateMovie.rejected,
                    deleteMovie.rejected,
                ),
                setError,
            );
    },
});

export default moviesSlice.reducer;
