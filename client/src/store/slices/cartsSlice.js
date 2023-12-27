import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isOpen: false,
};

const findItem = (item, payload) => {
  return ["id", "name", "color"].every((key) => item[key] === payload[key]);
};

const CartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addCart(state, { payload }) {
      const hasItem = state.list.find((item) => findItem(item, payload));
      if (hasItem) {
        hasItem.quantity = payload.quantity;
      } else {
        state.list.push(payload);
      }
    },

    incrementQuantity(state, { payload }) {
      const hasItem = state.list.find((item) => item.id === payload.id);
      hasItem.quantity += 1;
    },

    decrementQuantity(state, { payload }) {
      const hasItem = state.list.find((item) => item.id === payload.id);
      hasItem.quantity = Math.max(0, hasItem.quantity - 1);
    },

    removeCart(state, { payload }) {
      state.list = state.list.filter((item) => !findItem(item, payload));
    },

    resetCart: (state) => {
      state.list = [];
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addCart,
  removeCart,
  incrementQuantity,
  decrementQuantity,
  resetCart,
  toggleCart,
} = CartsSlice.actions;

export const CartsReducer = CartsSlice.reducer;
