import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
    dataLoadError: null,
    musicAlbums: {}, // {all: [{id, name}] и "101": {albumId, nameAlbum, photoAlbum, music:[{idSong, name, author, photo, uri, time}]}, ...}
    radioList: {}, // {nameAlbum, photo, listRadio}
};

const musicListsSlice = createSlice({
    name: "musicLists",
    initialState,
    reducers: {
        setLoadStateML: (state, action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
        },
        setDataML: (state, action) => {
            state.musicAlbums = action.payload.albums;
            state.radioList = action.payload.radioList;
        },
        setResultLoadML: (state, action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
            state.musicAlbums = action.payload.data.albums;
            state.radioList = action.payload.data.radioList;
        },
    },
});

export default musicListsSlice.reducer;
export const { setDataML, setLoadStateML, setResultLoadML } = musicListsSlice.actions;