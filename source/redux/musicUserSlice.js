import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
    dataLoadError: null,
    data: null,
}

export const musicUserSlice = createSlice({
    name: "musicUser",
    initialState,
    reducers: {
        test: () => {

        },
    },
});

export const { test } = musicUserSlice.actions;
export default musicUserSlice.reducer;