import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { ACTORS_SLICE_NAME, EMPTY_ACTOR_DATA } from '../../constants/constants';
import {
    createActor,
    deleteActor,
    getActorById,
    getAllActors,
    updateActor,
} from '../thunks/actorsThunks';

import { setIsPending, setError } from '../../services/reducer-service';

const initialState = {
    actors: [],
    currentActor: null,
    actorForEdit: EMPTY_ACTOR_DATA,
    isPending: false,
    error: null,
};

const actorsSlice = createSlice({
    name: ACTORS_SLICE_NAME,
    initialState,
    reducers: {
        setActorForEdit: (state, action) => {
            state.actorForEdit = action.payload;
        },
        clearCurrentActor: (state) => {
            state.currentActor = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllActors.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.actors = action.payload;
            })
            .addCase(getActorById.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.currentActor = action.payload;
            })
            .addCase(createActor.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.actors.push(action.payload);
            })
            .addCase(updateActor.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.actors = state.actors.map((actor) =>
                    actor.id === action.payload.id ? action.payload : actor,
                );
                state.currentActor = action.payload;
                state.actorForEdit = action.payload;
            })
            .addCase(deleteActor.fulfilled, (state, action) => {
                state.isPending = false;
                state.error = null;
                state.actors = state.actors.filter(
                    (actor) => actor.id !== action.payload,
                );
                state.currentActor = null;
                state.actorForEdit =
                    state.actorForEdit.id === action.payload
                        ? EMPTY_ACTOR_DATA
                        : state.actorForEdit;
            })
            .addMatcher(
                isAnyOf(
                    getAllActors.pending,
                    getActorById.pending,
                    createActor.pending,
                    updateActor.pending,
                    deleteActor.pending,
                ),
                setIsPending,
            )
            .addMatcher(
                isAnyOf(
                    getAllActors.rejected,
                    getActorById.rejected,
                    createActor.rejected,
                    updateActor.rejected,
                    deleteActor.rejected,
                ),
                setError,
            );
    },
});

export const { setActorForEdit, clearCurrentActor } = actorsSlice.actions;

export default actorsSlice.reducer;
