import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// apis
import { productsApi } from "./apis/productsApi";
import { categoriesApi } from "./apis/categoriesApi";
import { ordersApi } from "./apis/ordersApi";

// cart reducers
import {
  CartsReducer,
  addCart,
  removeCart,
  toggleCart,
} from "./slices/cartsSlice";

// wishlist reducers
import {
  WishlistSliceReducer,
  addToWishlist,
  removeFromWishlist,
} from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    carts: CartsReducer,
    wishlist: WishlistSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(ordersApi.middleware),
});

setupListeners(store.dispatch);

export { addCart, removeCart, toggleCart, addToWishlist, removeFromWishlist };
