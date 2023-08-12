import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../apis/productsApi";
import { productAlbumsApi } from "../apis/productAlbumsApi";
import { categoriesApi } from "../apis/categoriesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { CartsReducer, addCart, removeCart } from "./slices/cartsSlice";

export const store = configureStore(
	{
		reducer: {
			[productsApi.reducerPath]: productsApi.reducer,
			[categoriesApi.reducerPath]: categoriesApi.reducer,
			[productAlbumsApi.reducerPath]: productAlbumsApi.reducer,
			carts: CartsReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(productsApi.middleware)
				.concat(categoriesApi.middleware)
				.concat(productAlbumsApi.middleware),
	}
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(photosApi.middleware),
);
setupListeners(store.dispatch);
export { addCart, removeCart };
