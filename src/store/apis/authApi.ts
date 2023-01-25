import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type LoginData = {
    username: string;
    password: string;
}

export type LoginResponse = {
    id: number;
    username: string;
    token: string;
}

const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/auth",
        credentials: "include",
    }),
    endpoints(builder) {
        return {
            login: builder.mutation<LoginResponse, LoginData>({
                query: (user: LoginData) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: user,
                    }
                }
            }),
        }
    }
});

export const { useLoginMutation } = authApi;
export { authApi };