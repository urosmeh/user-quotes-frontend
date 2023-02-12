import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
    token: string,
    userId: number,
}

const initialState = {
    token: localStorage.getItem("token"),
    userId: localStorage.getItem("userId"),
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        saveLogin(state, action) {
            console.log(action);
            const { token, id } = action.payload;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", id);
            state.token = token;
            state.userId = id;
        },
        saveLogout(state) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            state.token = null;
            state.userId = null;
        }
    }
});

export const { saveLogin, saveLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;