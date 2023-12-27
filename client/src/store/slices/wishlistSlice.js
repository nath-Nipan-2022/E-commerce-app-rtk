import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: { list: [] },
  reducers: {
    addToWishlist(state, { payload }) {
      state.list.push(payload);
    },

    removeFromWishlist(state, { payload }) {
      state.list = state.list.filter((item) => item.id !== payload.id);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;

export const WishlistSliceReducer = WishlistSlice.reducer;
