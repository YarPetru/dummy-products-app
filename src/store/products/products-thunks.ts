import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { INewProduct } from 'types/types';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

axios.defaults.baseURL = 'https://dummyjson.com';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await axios.get('/products');
  return res.data.products;
});

export const addProduct = createAsyncThunk(
  'products/add',
  async (newProduct: INewProduct, { rejectWithValue }) => {
    try {
      const res = await axios.post('products/add', newProduct, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success(`New product ${newProduct.title} has successfully added`, {
        toastId: nanoid(),
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warn(
          `Something went wrong. Error: ${error.response?.data.message}`,
          {
            toastId: nanoid(),
          }
        );
      } else {
        toast.warn(`Something went wrong. Error: ${error}`, {
          toastId: nanoid(),
        });
      }
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (productId: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`products/${productId}`);
      toast.success(`Product with ID ${productId} has successfully deleted`, {
        toastId: nanoid(),
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.warn(
          `Something went wrong. Error: ${error.response?.data.message}`,
          {
            toastId: nanoid(),
          }
        );
      } else {
        toast.warn(`Something went wrong. Error: ${error}`, {
          toastId: nanoid(),
        });
      }
      return rejectWithValue(error);
    }
  }
);
