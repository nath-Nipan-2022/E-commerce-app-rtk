import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore(
	{
		reducer: {
			[productsApi.reducerPath]: productsApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(productsApi.middleware),
	}
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(photosApi.middleware),
);
setupListeners(store.dispatch);
