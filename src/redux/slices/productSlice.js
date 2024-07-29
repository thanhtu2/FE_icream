import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchProduct, fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;

export default productSlice.reducer;
