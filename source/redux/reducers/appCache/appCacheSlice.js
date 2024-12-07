import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playListTrack: [],
    currentTrack: {},
    idPlayTrack: 0,
    isPlaying: false,
};

const appCacheSlice = createSlice({
    name: "appCache",
    initialState,
    reducers: {
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
            state.isPlaying = true;
            state.idPlayTrack = action.payload.idTrack;
        },
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        resetCache: (state, action) => {
            if (action.payload) {
                state.playListTrack = [];
                state.currentTrack = {};
                state.idPlayTrack = 0;
                state.isPlaying = false;
            }
        },
    },
});

export default appCacheSlice.reducer;
export const { setCurrentTrack, togglePlay, resetCache } = appCacheSlice.actions;
