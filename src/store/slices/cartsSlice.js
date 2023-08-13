import { createSlice } from "@reduxjs/toolkit";

const CartsSlice = createSlice({
	name: "carts",
	initialState: {
		list: [],
		// isOpen: false
	},
	reducers: {
		addCart(state, action) {
			// add a cart
			// increase quantity if adding repeatedly
			const hasItem = state.list.find((item) => item.id === action.payload.id);
			if (hasItem) {
				hasItem.quantity = action.payload.quantity;
			} else {
				state.list.push(action.payload);
			}
		},
		incrementQuantity(state, action) {
			const hasItem = state.list.find((item) => item.id === action.payload.id);
			hasItem.quantity = hasItem.quantity + 1;
		},
		decrementQuantity(state, action) {
			const hasItem = state.list.find((item) => item.id === action.payload.id);
			hasItem.quantity = hasItem.quantity - 1;
		},
		removeCart(state, action) {
			// remove a cart
			state.list = state.list.filter(({ id }) => id !== action.payload.id);
		},
	},
});

export const { addCart, removeCart, incrementQuantity, decrementQuantity } =
	CartsSlice.actions;
export const CartsReducer = CartsSlice.reducer;
