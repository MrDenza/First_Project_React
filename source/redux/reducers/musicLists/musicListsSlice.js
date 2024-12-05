import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
    dataLoadError: null,
    musicAlbums: [],
    listAlbums: [],
    radioList: {},
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
            state.listAlbums = action.payload.data.albums.map((item) => ({
                idAlbum: item.idAlbum,
                titleAlbum: item.titleAlbum,
                photoAlbum: item.photoAlbum,
            }));
            state.radioList = action.payload.data.radioList;
        },
        resetStateML: (state, action) => {
            if (action.payload) {
                state.dataLoadState = 0;
                state.dataLoadError = null;
                state.musicAlbums = [];
                state.listAlbums = [];
                state.radioList = {};
            }
        },
    },
});

export default musicListsSlice.reducer;
export const { setDataML, setLoadStateML, setResultLoadML, resetStateML } = musicListsSlice.actions;
