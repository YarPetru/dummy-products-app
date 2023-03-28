// import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// // import openNotification from 'utils/notification';

// axios.defaults.baseURL =
//   // 'https://spacex-spacecrafts-backend.herokuapp.com/api/';
//   'http://localhost:9999/api/';

// const token = {
//   set(token: any) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common['Authorization'] = '';
//   },
// };

// const register = createAsyncThunk(
//   'auth/register',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post('/auth/register', credentials);
//       token.set(data.data.token);
//       return data.data;
//     } catch (error) {
//       // openNotification('warn', error.response.data.message);
//       return rejectWithValue(error);
//     }
//   }
// );

// const logIn = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post('/auth/login', credentials);
//       token.set(data.data.token);
//       return data.data;
//     } catch (error) {
//       // openNotification('error', error.response.data.message);
//       return rejectWithValue(error);
//     }
//   }
// );

// const logOut = createAsyncThunk(
//   'auth/logout',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axios.get('/auth/logout');
//       token.unset();
//       // openNotification(
//       //   'success',
//       //   'You have successfully logged out. See you later 👋'
//       // );
//     } catch (error) {
//       // openNotification('error', error.response.data.message);
//       return rejectWithValue(error);
//     }
//   }
// );

// const fetchCurrentUser = createAsyncThunk(
//   'auth/current',
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const persistedToken = state.auth.token;
//     if (persistedToken === null) {
//       // return thunkAPI.rejectWithValue();
//     }
//     token.set(persistedToken);
//     try {
//       const { data } = await axios.get('/auth/current');
//       return data.data;
//     } catch (error) {
//       // return thunkAPI.rejectWithValue();
//     }
//   }
// );

// const operations = {
//   register,
//   logOut,
//   logIn,
//   fetchCurrentUser,
// };

// export default operations;

export {};
