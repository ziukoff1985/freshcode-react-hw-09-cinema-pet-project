export const setIsPending = (state) => {
    state.isPending = true;
    state.error = null;
};

export const setError = (state, action) => {
    state.isPending = false;
    state.error = action.payload;
};
