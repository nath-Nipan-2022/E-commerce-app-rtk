import { createSlice } from "@reduxjs/toolkit";

const CartsSlice = createSlice({
	name: "carts",
	initialState: {
		list: [],
		isOpen: false,
	},
	reducers: {
		addCart(state, action) {
			// add a cart
			// console.log(action);
			state.list.push(action.payload);
		},
		removeCart(state, action) {
			// remove a cart
			state.list = state.list.filter(({ id }) => id !== action.payload.id);
		},
		openCart(state, action) {
			state.isOpen = true;
		},
	},
});

export const { addCart, removeCart } = CartsSlice.actions;
export const CartsReducer = CartsSlice.reducer;
