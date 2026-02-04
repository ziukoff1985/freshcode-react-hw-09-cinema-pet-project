import { createSlice } from '@reduxjs/toolkit';
import { ACTORS_SLICE_NAME } from '../../constants/constants';

const initialState = {
    actors: [],
    actorForEdit: null,
    isLoading: false,
    error: null,
};

const actorsSlice = createSlice({
    name: ACTORS_SLICE_NAME,
    initialState,
    reducers: {},
});

export default actorsSlice.reducer;
