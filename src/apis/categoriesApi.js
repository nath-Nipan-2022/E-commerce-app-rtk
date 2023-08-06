import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = async (duration) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), duration);
	});
};

const categoriesApi = createApi({
	reducerPath: "categories",
	tagTypes: ["Categories"],

	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3005",
		fetchFn: async (...args) => {
			await pause(500);
			return fetch(...args);
		},
	}),
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => "/categories",
			providesTags: (results, error, categories) => {
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
