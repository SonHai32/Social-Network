import { UserCredentials } from './../../models/user-credentials.model';
import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.action';

export const FEATURE_KEY = 'feature_auth';

export const initialState: AuthState = {
  userCredentials: null,
  user: null,
  isLoading: false,
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
      authenticated: false,
      hasError: false,
      errorMessage: '',
    };
  }),
  on(AuthActions.Register, (state: AuthState, { userCredentials }) => {
    return {
      ...state,
      isLoading: true,
      userCredentials,
      authenticated: false,
      hasError: false,
      errorMessage: ''
    };
  }),

  on(AuthActions.AuthFail, (state: AuthState, { errorMessage }) => {
    return {
      ...state,
      isLoading: false,
      errorMessage,
      userCredentials: null,
      authenticated: false,
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
