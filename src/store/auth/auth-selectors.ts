import { IUserState } from 'types/types';

// selectors
export const selectUser = (state: IUserState) => state.auth.user;

export const getIsLoggedIn = (state: IUserState) => state.auth.isLoggedIn;

// export const getFetchingCurrent = (state: IState) => state.auth.isFetchingUser;

// export const getIsPendingState = (state: IState) => state.auth.isPending;
