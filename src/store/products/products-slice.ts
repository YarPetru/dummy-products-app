import { createSlice } from '@reduxjs/toolkit';
import { IProductState } from 'types/types';
import { fetchProducts } from 'store/products';

const initialState: IProductState = {
  data: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default productsSlice.reducer;
