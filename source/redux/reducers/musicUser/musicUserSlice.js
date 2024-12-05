import { createSlice } from "@reduxjs/toolkit";

const nullTemplate = {
    idAlbum: "my",
    titleAlbum: "Мой плейлист",
    photoAlbum: "https://demotivation.ru/wp-content/uploads/2021/12/image_562610131056464036330.jpg",
    tracks: [],
};

const initialState = {
    dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
    dataLoadError: null,
    userAlbums: ["albums"],
    userMusicList: { ...nullTemplate },
    listIdTrack: [],
};

export const musicUserSlice = createSlice({
    name: "musicUser",
    initialState,
    reducers: {
        setLoadStateMU: (state, action) => {
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
        },
        addNewTrack: (state, action) => {
            // {data}
            const newTrack = action.payload;
            const trackExists = state.userMusicList.tracks?.some((track) => track.idTrack === newTrack.idTrack);
            if (!trackExists) {
                state.userMusicList.tracks.push(newTrack);
                state.listIdTrack.push(newTrack.idTrack);
            }
        },
        delTrackMU: (state, action) => {
            const idToDelete = action.payload;
            state.userMusicList.tracks = state.userMusicList.tracks.filter((track) => track.idTrack !== idToDelete);
            state.listIdTrack = state.listIdTrack.filter((id) => id !== idToDelete);
        },
        setDataMU: (state, action) => {
            // {data: ...}
            const data = action.payload.data;
            state.userAlbums = data.albums || {};
            state.userMusicList = data.musicList ? { ...nullTemplate, ...data.musicList } : { ...nullTemplate };
            state.listIdTrack = data.musicList.tracks?.map((elem) => elem.idTrack) || [];
        },
        setResultLoadMU: (state, action) => {
            // {state:... ,error:..., data:...}
            state.dataLoadState = action.payload.state;
            state.dataLoadError = action.payload.error;
            musicUserSlice.caseReducers.setDataMU(state, action);
        },
        resetStateMU: (state, action) => {
            if (action.payload) {
                state.dataLoadState = 0;
                state.dataLoadError = null;
                state.userAlbums = ["albums"];
                state.userMusicList = { ...nullTemplate };
                state.listIdTrack = [];
            }
        },
    },
});

export const { setLoadStateMU, setDataMU, setResultLoadMU, addNewTrack, delTrackMU, resetStateMU } = musicUserSlice.actions;
export default musicUserSlice.reducer;
