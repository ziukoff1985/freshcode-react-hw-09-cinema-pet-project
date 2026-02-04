import { createAsyncThunk } from '@reduxjs/toolkit';

import { MOVIES_SLICE_NAME } from '../../constants/constants';
import { api } from '../../api/api';

export const getAllMovies = createAsyncThunk(
    `${MOVIES_SLICE_NAME}/getAllMovies`,
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get('/movies');
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const getMovieById = createAsyncThunk(
    `${MOVIES_SLICE_NAME}/getMovieById`,
    async (id, thunkAPI) => {
        try {
            const { data } = await api.get(`/movies/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createMovie = createAsyncThunk(
    `${MOVIES_SLICE_NAME}/createMovie`,
    async (movieData, thunkAPI) => {
        try {
            const { data } = await api.post('/movies', movieData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateMovie = createAsyncThunk(
    `${MOVIES_SLICE_NAME}/updateMovie`,
    async (movieData, thunkAPI) => {
        try {
            const { data } = await api.put(
                `/movies/${movieData.id}`,
                movieData,
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const deleteMovie = createAsyncThunk(
    `${MOVIES_SLICE_NAME}/deleteMovie`,
    async (movieId, thunkAPI) => {
        try {
            await api.delete(`/movies/${movieId}`);
            return movieId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
