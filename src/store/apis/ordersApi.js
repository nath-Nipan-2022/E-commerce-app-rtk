import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders"],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (url) => `/orders/${url || ""}`,
    }),
    makeOrders: builder.mutation({
      query: (orders) => ({
        url: "/orders",
        method: "POST",
        body: orders,
      }),
    }),
  }),
});

export { ordersApi };
export const { useGetOrdersQuery, useMakeOrdersMutation } = ordersApi;
