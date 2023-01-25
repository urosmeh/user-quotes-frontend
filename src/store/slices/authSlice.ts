import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    token: string,
}

const initialState = {
    token: localStorage.getItem("token"),
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        saveLogin(state, action) {
            const token = action.payload;
            localStorage.setItem("token", token);
            state.token = token;
        },
        saveLogout(state) {
            localStorage.removeItem("token");
            state.token = null;
        }
    }
});

export const { saveLogin, saveLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;