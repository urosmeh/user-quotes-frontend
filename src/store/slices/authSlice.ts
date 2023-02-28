import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  token: string;
  userId: number;
  avatar: string;
};
const userId = localStorage.getItem("userId");

const initialState = {
  token: localStorage.getItem("token"),
  userId: userId ? parseInt(userId) : null,
  avatar: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    saveLogin(state, action) {
      console.log(action);
      const { token, id, avatar } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);
      state.token = token;
      state.userId = id;
      state.avatar = avatar;
    },
    saveLogout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.token = null;
      state.userId = null;
      state.avatar = null;
    },
  },
});

export const { saveLogin, saveLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
