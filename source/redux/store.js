import { configureStore } from "@reduxjs/toolkit";

import musicUserReducer from "./musicUserSlice";

export const store = configureStore({
    reducer: {
        musicUser: musicUserReducer,
    }
});