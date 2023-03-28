import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://dummyjson.com';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get('/products');
  return res.data.products;
});
