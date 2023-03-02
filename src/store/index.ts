import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import { quotesApi } from "./apis/quotesApi";
import { usersApi } from "./apis/usersApi";
import { authSlice, saveLogin, saveLogout } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    authToken: authSlice.reducer,
    [quotesApi.reducerPath]: quotesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      quotesApi.middleware,
      usersApi.middleware
    );
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export { store };
export { saveLogin, saveLogout };
export { useLoginMutation, useSignupMutation } from "./apis/authApi";
export { useGetQuotesQuery, useUpvoteMutation } from "./apis/quotesApi";
export {
  useGetUserByIdQuery,
  useGetUserAvatarQuery,
  useGetUserLikedByIdQuery,
  useGetUserQuotesByIdQuery,
} from "./apis/usersApi";
