import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from 'types/types';

const initialState: IAuth = {
  user: {
    id: null,
    email: null,
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; email: string }>) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
      };
      state.isLoggedIn = true;
    },
    logout: state => {
      state.user = {
        id: null,
        email: null,
      };
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
