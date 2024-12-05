import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playListTrack: [],
    currentTrack: "https://s3.deliciouspeaches.com/get/music/20190421/Rammstein_-_Haifisch_63640728.mp3",
    isPlaying: false,
};

const appCacheSlice = createSlice({
    name: "appCache",
    initialState,
    reducers: {
        setCurrentTrack(state, action) {
            state.currentTrack = action.payload;
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
    },
});

export default appCacheSlice.reducer;
export const { setCurrentTrack, togglePlay } = appCacheSlice.actions;
