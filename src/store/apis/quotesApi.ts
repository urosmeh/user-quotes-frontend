import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Quote } from "../../interfaces/Quote";
import { User } from "../../interfaces/User";

export type CreateQuote = {
  quote: string;
};

export type CreateQuoteResponse = {
  id: number;
  quote: string;
  user: User;
};

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
      createQuote: builder.mutation<CreateQuoteResponse, CreateQuote>({
        query: (quote: CreateQuote) => {
          return {
            url: "/create",
            method: "POST",
            body: quote,
          };
        },
        invalidatesTags: ["Quote"],
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

export const { useGetQuotesQuery, useUpvoteMutation, useCreateQuoteMutation } =
  quotesApi;
export { quotesApi };
