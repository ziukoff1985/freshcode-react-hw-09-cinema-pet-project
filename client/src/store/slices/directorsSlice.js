import { createSlice } from '@reduxjs/toolkit';
import { DIRECTORS_SLICE_NAME } from '../../constants/constants';

const initialState = {
    directors: [],
    directorForEdit: null,
    isLoading: false,
    error: null,
};

const directorsSlice = createSlice({
    name: DIRECTORS_SLICE_NAME,
    initialState,
    reducers: {},
});

export default directorsSlice.reducer;
