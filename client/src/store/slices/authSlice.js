import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    addUser(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
  },
});

export const { addUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
