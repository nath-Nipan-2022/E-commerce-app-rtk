import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "products",
  tagTypes: ["Products"],

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
    getProducts: builder.query({
      query: (type) => `/products${type}`,
      providesTags: () => [{ type: "Products", id: "LIST" }],
    }),
    getProductById: builder.query({
      query: (productId) => `/products${productId}`,
    }),
  }),
});

export { productsApi };
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
