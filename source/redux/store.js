import { configureStore } from "@reduxjs/toolkit";

import musicListsSlice from "./reducers/musicLists/musicListsSlice";
import musicUserSlice from "./reducers/musicUser/musicUserSlice";
import userDataSlice from "./reducers/userData/userDataSlice";
import appCacheSlice from "./reducers/appCache/appCacheSlice";

export const store = configureStore({
    reducer: {
        musicLists: musicListsSlice,
        musicUser: musicUserSlice,
        userData: userDataSlice,
        appCache: appCacheSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
