import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./apis/productsApi";
import { categoriesApi } from "./apis/categoriesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { CartsReducer, addCart, removeCart } from "./slices/cartsSlice";
import { ordersApi } from "./apis/ordersApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    carts: CartsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(ordersApi.middleware),
});
setupListeners(store.dispatch);
export { addCart, removeCart };
