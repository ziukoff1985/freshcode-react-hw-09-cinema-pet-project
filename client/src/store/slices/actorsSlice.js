import { createSlice } from '@reduxjs/toolkit';
import { ACTORS_SLICE_NAME, EMPTY_ACTOR_DATA } from '../../constants/constants';

const initialState = {
    actors: [],
    actorForEdit: EMPTY_ACTOR_DATA,
    isPending: false,
    error: null,
};

const actorsSlice = createSlice({
    name: ACTORS_SLICE_NAME,
    initialState,
    reducers: {},
});

export default actorsSlice.reducer;
