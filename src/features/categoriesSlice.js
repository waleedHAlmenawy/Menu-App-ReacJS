import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  status: 'pending',
  error: null
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const { data } = await axios.get("http://localhost:3000/categories");
    return data;
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getCategory: (state, action) => {
      return [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = 'loading'
    })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'complated';
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
  }
});

export default categorySlice.reducer;

export const { getCategory } = categorySlice.actions;

export const selectAllCategories = (state) => state.categories.categories;
