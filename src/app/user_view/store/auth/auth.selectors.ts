import { FEATURE_KEY } from './auth.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const authFeatureSelector = createFeatureSelector<AuthState>(FEATURE_KEY);

export const getUserSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.user
);

export const getAuthSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.authenticated
);

export const getIsLoadingSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.isLoading
);
export const getHasErrorSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.hasError
);
export const getErrorMessageSelector = createSelector(
  authFeatureSelector,
  (state: AuthState) => state.errorMessage
);
