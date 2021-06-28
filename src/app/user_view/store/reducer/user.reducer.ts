import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { User } from '../../models/user.model';

export interface userState {
  user: User | null;
  isLoading: boolean;
  loggedIn: boolean;
  hasError: boolean;
  errorMessage: string;
}

export const initialState: userState = {
  user: null,
  isLoading: true,
  loggedIn: false,
  hasError: false,
  errorMessage: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.userLogin, (state: userState, { user }) => {
    return {
      ...state,
      user: user,
      isLoading: true,
    };
  }),
  on(UserActions.userLoginComplete, (state: userState, { user }) => {
    return {
      ...state,
      user,
      isLoading: false,
      loggedIn: true,
    };
  }),
  on(UserActions.userLoginError, (state: userState, { errorMessage }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage,
    };
  }),
  on(UserActions.userLogout, (state: userState) => state)
);
