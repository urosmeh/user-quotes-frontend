import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type LoginData = {
  username: string;
  password: string;
};

//todo: add image
export type SignupData = {
  username: string;
  password: string;
};

export type SignupResponse = {
  username: string;
};

export type LoginResponse = {
  id: number;
  username: string;
  token: string;
};

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
          };
        },
      }),
      signup: builder.mutation<SignupResponse, SignupData>({
        query: (user: SignupData) => {
          return {
            url: "/signup",
            method: "POST",
            body: user,
          };
        },
      }),
    };
  },
});

export const { useLoginMutation, useSignupMutation } = authApi;
export { authApi };
