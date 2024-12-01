import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
    dataLoadError: null,
    user:{
        email: null,
        uid: null,
    },
    userSettings: null,
    userIsAuth: false,
}

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setLoadStateUD: (state, action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
        },
        setUserAuth: (state, action) => {
            state.userIsAuth = action.payload;
        },
        setResultLoadUD: (state, action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
            state.user = action.payload.data;
        },
        setUserSettings: (state, action) => {
            state.userSettings = action.payload.settings;
        },
    },
});

export const { setLoadStateUD, setUserAuth, setResultLoadUD, setUserSettings } = userDataSlice.actions;
export default userDataSlice.reducer;