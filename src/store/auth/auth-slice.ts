import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from 'types/types';
// import authOperations from './auth-operations';

const initialState: IAuth = {
  user: {
    id: null,
    email: null,
    // token: null
  },
  // token: null,
  isLoggedIn: false,
  // isFetchingUser: false,
  // isPending: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; email: string }>) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        // token: action.payload.token,
      };
      state.isLoggedIn = true;
    },
    logout: state => {
      state.user = {
        id: null,
        email: null,
        //  token: null
      };
      state.isLoggedIn = false;
    },
  },
  // extraReducers: {
  //   [authOperations.register.fulfilled](state, action) {
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //     state.isLoggedIn = true;
  //     state.isPending = false;
  //   },
  //   [authOperations.register.pending](state) {
  //     state.isPending = true;
  //   },
  //   [authOperations.register.rejected](state) {
  //     state.isLoggedIn = false;
  //     state.isPending = false;
  //   },
  //   [authOperations.logIn.fulfilled](state, action) {
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //     state.isLoggedIn = true;
  //     state.isPending = false;
  //   },
  //   [authOperations.logIn.pending](state) {
  //     state.isPending = true;
  //   },
  //   [authOperations.logIn.rejected](state) {
  //     state.isPending = false;
  //     state.isLoggedIn = false;
  //   },
  //   [authOperations.logOut.fulfilled](state) {
  //     state.user.name = null;
  //     state.user.email = null;
  //     state.token = null;
  //     state.isLoggedIn = false;
  //   },
  //   [authOperations.fetchCurrentUser.fulfilled](state, action) {
  //     state.user.name = action.payload.user.name;
  //     state.user.email = action.payload.user.email;
  //     state.isLoggedIn = true;
  //     state.isFetchingUser = false;
  //   },
  //   [authOperations.fetchCurrentUser.pending](state) {
  //     state.isFetchingUser = true;
  //   },
  //   [authOperations.fetchCurrentUser.rejected](state) {
  //     state.isFetchingUser = false;
  //   },
  // },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

// reducers: {
//   login: (state, action) => {
//     state.user = action.payload;
//   },
//   logout: state => {
//     state.user = null;
//   },
// },
