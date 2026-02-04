import { createAsyncThunk } from '@reduxjs/toolkit';
import { STUDIOS_SLICE_NAME } from '../../constants/constants';
import { api } from '../../api/api';

export const getAllStudios = createAsyncThunk(
    `${STUDIOS_SLICE_NAME}/getAllStudios`,
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get('/studios');
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const getStudioById = createAsyncThunk(
    `${STUDIOS_SLICE_NAME}/getStudioById`,
    async (id, thunkAPI) => {
        try {
            const { data } = await api.get(`/studios/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createStudio = createAsyncThunk(
    `${STUDIOS_SLICE_NAME}/createStudio`,
    async (studioData, thunkAPI) => {
        try {
            const { data } = await api.post('/studios', studioData);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateStudio = createAsyncThunk(
    `${STUDIOS_SLICE_NAME}/updateStudio`,
    async (studioData, thunkAPI) => {
        try {
            const { data } = await api.put(
                `/studios/${studioData.id}`,
                studioData,
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const deleteStudio = createAsyncThunk(
    `${STUDIOS_SLICE_NAME}/deleteStudio`,
    async (studioId, thunkAPI) => {
        try {
            await api.delete(`/studios/${studioId}`);
            return studioId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
