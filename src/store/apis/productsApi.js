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
		prepareHeaders: (headers) => {
			// const token = getState().auth.token;
			// console.log(token);
			// If we have a token set in state, let's assume that we should be passing it.
			headers.set(
				"authorization",
				`Bearer ${import.meta.env.VITE_REACT_APP_API_TOKEN}`
			);
			// if (!token) {
			// }
			return headers;
		},
		fetchFn: async (...args) => {
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: (type) => {
				return `/products${type}`;
			},
			providesTags: () => [{ type: "Products", id: "LIST" }],
		}),

		getProductById: builder.query({
			query: (productId) => `/products${productId}`,
		}),
	}),
});

export { productsApi };
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
