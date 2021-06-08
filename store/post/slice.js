import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "post",
  initialState: {
    data: null,
    fetching: true,
  },
  reducers: {
    fetchPosts: (state, action) => {
      state.data = action.payload;
      state.fetching = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchPosts } = counterSlice.actions;

export default counterSlice.reducer;
