import { createAsyncThunk } from '@reduxjs/toolkit';

import { DIRECTORS_SLICE_NAME } from '../../constants/constants';
import { api } from '../../api/api';

export const getAllDirectors = createAsyncThunk(
    `${DIRECTORS_SLICE_NAME}/getAllDirectors`,
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get('/directors');
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const getDirectorById = createAsyncThunk(
    `${DIRECTORS_SLICE_NAME}/getDirectorById`,
    async (id, thunkAPI) => {
        try {
            const { data } = await api.get(`/directors/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createDirector = createAsyncThunk(
    `${DIRECTORS_SLICE_NAME}/createDirector`,
    async (directorData, thunkAPI) => {
        try {
            const { data } = await api.post('/directors', directorData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateDirector = createAsyncThunk(
    `${DIRECTORS_SLICE_NAME}/updateDirector`,
    async (directorData, thunkAPI) => {
        try {
            const { data } = await api.put(
                `/directors/${directorData.id}`,
                directorData,
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const deleteDirector = createAsyncThunk(
    `${DIRECTORS_SLICE_NAME}/deleteDirector`,
    async (id, thunkAPI) => {
        try {
            const { data } = await api.delete(`/directors/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
