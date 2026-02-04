import { createAsyncThunk } from '@reduxjs/toolkit';

import { ACTORS_SLICE_NAME } from '../../constants/constants';
import { api } from '../../api/api';

export const getAllActors = createAsyncThunk(
    `${ACTORS_SLICE_NAME}/getAllActors`,
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get('/actors');
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const getActorById = createAsyncThunk(
    `${ACTORS_SLICE_NAME}/getActorById`,
    async (id, thunkAPI) => {
        try {
            const { data } = await api.get(`/actors/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const createActor = createAsyncThunk(
    `${ACTORS_SLICE_NAME}/createActor`,
    async (actor, thunkAPI) => {
        try {
            const { data } = await api.post('/actors', actor);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const updateActor = createAsyncThunk(
    `${ACTORS_SLICE_NAME}/updateActor`,
    async (actorData, thunkAPI) => {
        try {
            const { data } = await api.put(
                `/actors/${actorData.id}`,
                actorData,
            );
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const deleteActor = createAsyncThunk(
    `${ACTORS_SLICE_NAME}/deleteActor`,
    async (actorId, thunkAPI) => {
        try {
            await api.delete(`/actors/${actorId}`);
            return actorId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);
