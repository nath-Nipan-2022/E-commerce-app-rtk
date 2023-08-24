import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = async (duration) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), duration);
	});
};

const categoriesApi = createApi({
	reducerPath: "category",
	tagTypes: ["Category"],

	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
		prepareHeaders: (headers) => {
			headers.set('authorization', 'Bearer ' + import.meta.env.VITE_REACT_APP_API_TOKEN);
			return headers;
		},
		fetchFn: async (...args) => {
			await pause(500);
			return fetch(...args);
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
		})
	}),
});

export { categoriesApi };
export const { useGetCategoriesQuery,useGetACategoryQuery, useGetSubcategoriesQuery } = categoriesApi;
