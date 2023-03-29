import { createSlice } from '@reduxjs/toolkit';
import { IProductState } from 'types/types';
import { addProduct, deleteProduct, fetchProducts } from 'store/products';

const initialState: IProductState = {
  data: [],
  newProduct: null,
  deletedProduct: null,
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

    builder.addCase(addProduct.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProduct = action.payload;
    });

    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(deleteProduct.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deletedProduct = action.payload;
      state.data = state.data.filter(product => {
        return product.id !== action.payload.id;
      });
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default productsSlice.reducer;
