import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_USER = { email: null, uid: null };
const DEFAULT_SETTINGS = {
    appearance: "dark",
    colorTheme: "amber",
};

const initialState = {
    dataLoadState: 0, // 0 , 1 - is loading, 2 - load, 3 - error
    dataLoadError: null,
    user: { ...DEFAULT_USER },
    userSettings: { ...DEFAULT_SETTINGS },
    userIsAuth: false,
};

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
        setAppearance: (state, action) => {
            state.userSettings.appearance = action.payload;
        },
        setColorTheme: (state, action) => {
            state.userSettings.colorTheme = action.payload;
        },
        resetStateUD: (state, action) => {
            if (action.payload) {
                state.dataLoadState = 0;
                state.dataLoadError = null;
                state.user = { ...DEFAULT_USER };
                //state.userSettings = { ...DEFAULT_SETTINGS };
                state.userIsAuth = false;
            }
        },
    },
});

export const { setLoadStateUD, setUserAuth, setResultLoadUD, setUserSettings, setAppearance, setColorTheme, resetStateUD } =
    userDataSlice.actions;
export default userDataSlice.reducer;
