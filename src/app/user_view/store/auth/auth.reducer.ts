import { createReducer, on } from '@ngrx/store';
import {AuthActions} from '../actions/user.action';
import { User } from '../../models/user.model';

export interface authState {
  user: User | null;
  isLoading: boolean;
  authenticated: boolean;
  hasError: boolean;
  errorMessage: string;
}

export const initialState: authState = {
  user: null,
  isLoading: true,
  authenticated: false,
  hasError: false,
  errorMessage: '',
};

export const userReducer = createReducer(
  initialState,
  on(AuthActions.Login, (state: authState, { user }) => {
    return {
      ...state,
      user: user,
      isLoading: true,
    };
  }),
  on(AuthActions.LoginComplete, (state: authState, { user }) => {
    return {
      ...state,
      user,
      isLoading: false,
      authenticated: true,
    };
  }),
  on(AuthActions.LoginFail, (state: authState, { errorMessage }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage,
    };
  }),
  on(AuthActions.Logout, (state: authState) => {
    return {
      ...state,
      user: null,
      authenticated: false,
    }
  })
);
