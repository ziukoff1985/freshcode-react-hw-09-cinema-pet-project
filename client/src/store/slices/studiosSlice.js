import { createSlice } from '@reduxjs/toolkit';
import { STUDIOS_SLICE_NAME } from '../../constants/constants';

const initialState = {
    studios: [],
    studioForEdit: null,
    isLoading: false,
    error: null,
};

const studiosSlice = createSlice({
    name: STUDIOS_SLICE_NAME,
    initialState,
    reducers: {},
});

export default studiosSlice.reducer;
