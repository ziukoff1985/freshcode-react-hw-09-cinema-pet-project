import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    STUDIOS_SLICE_NAME,
    EMPTY_STUDIO_DATA,
} from '../../constants/constants';
import {
    createStudio,
    deleteStudio,
    getAllStudios,
    getStudioById,
    updateStudio,
} from '../thunks/studiosThunks';
import { setError, setIsPending } from '../../services/reducer-service';

const initialState = {
    studios: [],
    currentStudio: null,
    studioForEdit: EMPTY_STUDIO_DATA,
    isPending: false,
    error: null,
};

const studiosSlice = createSlice({
    name: STUDIOS_SLICE_NAME,
    initialState,
    reducers: {
        setStudioForEdit: (state, action) => {
            state.studioForEdit = action.payload;
        },
        clearCurrentStudio: (state) => {
            state.currentStudio = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllStudios.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.studios = action.payload;
            })
            .addCase(getStudioById.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.currentStudio = action.payload;
            })
            .addCase(createStudio.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.studios.push(action.payload);
            })
            .addCase(updateStudio.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.studios = state.studios.map((studio) =>
                    studio.id === action.payload.id ? action.payload : studio,
                );
                state.currentStudio = action.payload;
                state.studioForEdit = action.payload;
            })
            .addCase(deleteStudio.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.studios = state.studios.filter(
                    (studio) => studio.id !== action.payload,
                );
                state.currentStudio = null;
                state.studioForEdit =
                    state.studioForEdit.id === action.payload
                        ? EMPTY_STUDIO_DATA
                        : state.studioForEdit;
            })
            .addMatcher(
                isAnyOf(
                    getAllStudios.pending,
                    getStudioById.pending,
                    createStudio.pending,
                    updateStudio.pending,
                    deleteStudio.pending,
                ),
                setIsPending,
            )
            .addMatcher(
                isAnyOf(
                    getAllStudios.rejected,
                    getStudioById.rejected,
                    createStudio.rejected,
                    updateStudio.rejected,
                    deleteStudio.rejected,
                ),
                setError,
            );
    },
});

export const { setStudioForEdit, clearCurrentStudio } = studiosSlice.actions;

export default studiosSlice.reducer;
