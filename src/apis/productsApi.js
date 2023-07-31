import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = async (duration) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), duration);
	});
};

const productsApi = createApi({
	reducerPath: "products",
	tagTypes: ["Products"],

	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3005",
		fetchFn: async (...args) => {
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => {
				return {
					url: "/products",
					method: "GET",
				};
			},
			providesTags: (results, error, products) => {
				const tags = results.map((product) => ({
					type: "product",
					id: product.id,
				}));
				return tags;
			},
		}),
	}),
});

export { productsApi };
export const { useGetProductsQuery } = productsApi;
