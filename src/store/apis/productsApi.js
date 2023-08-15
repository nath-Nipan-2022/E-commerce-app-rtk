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
		baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token;
			// console.log(token);
			// If we have a token set in state, let's assume that we should be passing it.
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
		fetchFn: async (...args) => {
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (query = "") => {
				return {
					url: `/products${query}`,
					method: "GET",
				};
			},
			// providesTags: (results, error, products) => {
			// 	const tags = results.map((product) => ({
			// 		type: "product",
			// 		id: product.id,
			// 	}));
			// 	return tags;
			// },
		}),
	}),
});

export { productsApi };
export const { useGetProductsQuery } = productsApi;
