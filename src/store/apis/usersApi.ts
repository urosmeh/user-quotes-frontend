import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Paginated } from "../../interfaces/Paginated";
import { Quote } from "../../interfaces/Quote";
import { User } from "../../interfaces/User";

export type UserQuotesResponse = {
  data: Array<Quote>;
} & Paginated;

export type UserQuotesRequest = {
  id: string | undefined;
  page: number;
};

export type UserWithMostLiked = {
  likes: Array<Quote>;
} & User;

const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/users",
    credentials: "include",
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<UserWithMostLiked, Partial<UserQuotesRequest>>({
      query: ({ id }) => ({
        url: `/${id}`,
      }),
      providesTags: ["User"],
    }),
    getUserAvatar: builder.query({
      query: (avatar: string) => ({
        url: `avatar/${avatar}`,
      }),
    }),

    //todo: move this to quotes (for tags invalidation)
    getUserLikedById: builder.query<UserQuotesResponse, UserQuotesRequest>({
      query: ({ id, page }) => ({
        url: `/${id}/liked`,
        params: { page },
      }),
    }),
    getUserQuotesById: builder.query<UserQuotesResponse, UserQuotesRequest>({
      query: ({ id, page }) => ({
        url: `/${id}/quotes`,
        params: { page },
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserAvatarQuery,
  useGetUserLikedByIdQuery,
  useGetUserQuotesByIdQuery,
} = usersApi;
export { usersApi };
