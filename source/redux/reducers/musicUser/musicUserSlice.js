import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
    dataLoadError: null,
    userAlbums: null,
    userMusicList: null,
}

export const musicUserSlice = createSlice({
    name: "musicUser",
    initialState,
    reducers: {
        setLoadStateMU: (state, action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
        },
        setDataMU: (state, action) => {
            state.userAlbums = action.payload.albums && {};
            state.userMusicList = action.payload.musicList && [];
        },
        setResultLoadMU: (state, action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
            state.userAlbums = action.payload.albums;
            state.userMusicList = action.payload.musicList;
        },
    },
});

export const { setLoadStateMU, setDataMU, setResultLoadMU } = musicUserSlice.actions;
export default musicUserSlice.reducer;