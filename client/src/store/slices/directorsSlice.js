import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
    DIRECTORS_SLICE_NAME,
    EMPTY_DIRECTOR_DATA,
} from '../../constants/constants';
import {
    createDirector,
    deleteDirector,
    getAllDirectors,
    getDirectorById,
    updateDirector,
} from '../thunks/directorsThunks';
import { setError, setIsPending } from '../../services/reducer-service';

const initialState = {
    directors: [],
    currentDirector: null,
    directorForEdit: EMPTY_DIRECTOR_DATA,
    isPending: false,
    error: null,
};

const directorsSlice = createSlice({
    name: DIRECTORS_SLICE_NAME,
    initialState,
    reducers: {
        setDirectorForEdit: (state, action) => {
            state.directorForEdit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllDirectors.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.directors = action.payload;
            })
            .addCase(getDirectorById.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.currentDirector = action.payload;
            })
            .addCase(createDirector.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.directors.push(action.payload);
            })
            .addCase(updateDirector.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.directors = state.directors.map((director) =>
                    director.id === action.payload.id
                        ? action.payload
                        : director,
                );
                state.currentDirector = action.payload;
                state.directorForEdit = action.payload;
            })
            .addCase(deleteDirector.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.directors = state.directors.filter(
                    (director) => director.id !== action.payload,
                );
                state.currentDirector = null;
                state.directorForEdit =
                    state.directorForEdit.id === action.payload
                        ? EMPTY_DIRECTOR_DATA
                        : state.directorForEdit;
            })
            .addMatcher(
                isAnyOf(
                    getAllDirectors.pending,
                    getDirectorById.pending,
                    createDirector.pending,
                    updateDirector.pending,
                    deleteDirector.pending,
                ),
                setIsPending,
            )
            .addMatcher(
                isAnyOf(
                    getAllDirectors.rejected,
                    getDirectorById.rejected,
                    createDirector.rejected,
                    updateDirector.rejected,
                    deleteDirector.rejected,
                ),
                setError,
            );
    },
});

export default directorsSlice.reducer;
