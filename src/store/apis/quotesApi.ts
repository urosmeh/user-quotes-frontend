import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Quote } from "../../interfaces/Quote";

export type QuotesResponse = {
  data: Array<Quote>;
  page: number;
  total: number;
  lastPage: number;
};

const quotesApi = createApi({
  reducerPath: "quotes",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/quotes",
    credentials: "include",
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Quote"],
  endpoints(builder) {
    return {
      getQuotes: builder.query<QuotesResponse, number>({
        //todo: add page param
        query: (page) => ({
          url: "",
          params: { page },
        }),
        providesTags: (result) =>
          result && result.data
            ? [
                ...result.data.map(({ id }) => ({
                  type: "Quote" as const,
                  id,
                })),
                "Quote",
              ]
            : ["Quote"],
      }),
      upvote: builder.mutation<any, any>({
        query: (quoteId: number) => {
          return {
            url: `${quoteId}/upvote`,
            method: "PATCH",
          };
        },
        invalidatesTags: (arg) => [{ type: "Quote", id: arg.quoteId }],
      }),
    };
  },
});

export const { useGetQuotesQuery, useUpvoteMutation } = quotesApi;
export { quotesApi };
