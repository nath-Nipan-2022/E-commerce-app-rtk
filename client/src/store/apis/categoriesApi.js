import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoriesApi = createApi({
  reducerPath: "category",
  tagTypes: ["Category"],

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
    prepareHeaders: (headers) => {
			headers.set('authorization', 'Bearer ' + import.meta.env.VITE_REACT_APP_API_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (query) => `/categories/${query}`,
      providesTags: (results, error, category) => {
        const tags = results.data.map((category) => ({
          type: "categories",
          id: category.id,
        }));
        return tags;
      },
    }),
    getACategory: builder.query({
			query: (category) => `/products/${category}`
    }),
    getSubcategories: builder.query({
      query: (category) => `/sub-categories/${category}`
    }),
    getColors: builder.query({
      query: (category) => `/colors/${category}`,
    }),
  }),
});

export { categoriesApi };
export const {
  useGetCategoriesQuery,
  useGetACategoryQuery,
  useGetSubcategoriesQuery,
  useGetColorsQuery,
} = categoriesApi;
