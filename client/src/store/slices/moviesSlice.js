import { createSlice } from '@reduxjs/toolkit';
import { MOVIES_SLICE_NAME } from '../../constants/constants';

const initialState = {
    movies: [],
    movieForEdit: null,
    isLoading: false,
    error: null,
};

const moviesSlice = createSlice({
    name: MOVIES_SLICE_NAME,
    initialState,
    reducers: {},
});

export default moviesSlice.reducer;
