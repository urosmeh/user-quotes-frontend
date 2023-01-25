import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import { authSlice, saveLogin, saveLogout } from "./slices/authSlice"

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authToken: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(authApi.middleware);
    }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export { store };
export { saveLogin, saveLogout };
export { useLoginMutation } from "./apis/authApi";