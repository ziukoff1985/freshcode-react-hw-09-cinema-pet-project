import { createSlice } from '@reduxjs/toolkit';
import {
    DIRECTORS_SLICE_NAME,
    EMPTY_DIRECTOR_DATA,
} from '../../constants/constants';

const initialState = {
    directors: [],
    directorForEdit: EMPTY_DIRECTOR_DATA,
    isPending: false,
    error: null,
};

const directorsSlice = createSlice({
    name: DIRECTORS_SLICE_NAME,
    initialState,
    reducers: {},
});

export default directorsSlice.reducer;
