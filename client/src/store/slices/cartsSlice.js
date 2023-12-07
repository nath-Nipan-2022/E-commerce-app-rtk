import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  // isOpen: false
};

const CartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart(state, action) {
      // add a cart
      // increase quantity if adding repeatedly
      const hasItem = state.list.find(
        (item) =>
          item.name === action.payload.name &&
          item.color === action.payload.color
      );
      if (hasItem) {
        hasItem.quantity = action.payload.quantity || hasItem.quantity + 1;
      } else {
        state.list.push({
          quantity: 1,
          ...action.payload,
        });
      }
    },
    incrementQuantity(state, action) {
      const hasItem = state.list.find((item) => item.id === action.payload.id);
      hasItem.quantity += 1;
    },
    decrementQuantity(state, action) {
      const hasItem = state.list.find((item) => item.id === action.payload.id);
      hasItem.quantity > 0 ? (hasItem.quantity -= 1) : 0;
    },
    removeCart(state, action) {
      // remove a cart
      state.list = state.list.filter(({ id }) => id !== action.payload.id);
    },
    resetCart: () => initialState,
  },
});

export const {
  addCart,
  removeCart,
  incrementQuantity,
  decrementQuantity,
  resetCart,
} = CartsSlice.actions;
export const CartsReducer = CartsSlice.reducer;
