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
		baseUrl: "https://dummyjson.com/products",
		fetchFn: async (...args) => {
			await pause(500);
			return fetch(...args);
		},
	}),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: (query) => `/category/${query}`,
			providesTags: (results, error, category) => {
				const tags = results.map((category) => ({
					type: "category",
					id: category.id,
				}));
				return tags;
			},
		}),
	}),
});

export { categoriesApi };
export const { useGetCategoriesQuery } = categoriesApi;
