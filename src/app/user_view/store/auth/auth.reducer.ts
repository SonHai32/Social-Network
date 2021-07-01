import { UserCredentials } from './../../models/user-credentials.model';
import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.action';

export const FEATURE_KEY = 'feature_auth';

export const initialState: AuthState = {
  user: null,
  isLoading: true,
  authenticated: false,
  hasError: false,
  errorMessage: '',
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.Login, (state: AuthState, { userCredentials }) => {
    return {
      ...state,
      userCredentials,
      isLoading: true,
    };
  }),
  on(AuthActions.Register, (state: AuthState, { userCredentials }) => {
    return {
      ...state,
      isLoading: false,
      userCredentials,
    };
  }),

  on(AuthActions.AuthFail, (state: AuthState, { errorMessage }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage,
      userCredentials: null,
    };
  }),
  on(AuthActions.AuthSuccess, (state: AuthState, { user }) => {
    return {
      ...state,
      user,
      isLoading: false,
      authenticated: true,
      errorMessage: '',
      hasError: false,
      UserCredentials: null,
    };
  }),
  on(AuthActions.Logout, (state: AuthState) => {
    return {
      ...state,
      user: null,
      authenticated: false,
    };
  })
);
