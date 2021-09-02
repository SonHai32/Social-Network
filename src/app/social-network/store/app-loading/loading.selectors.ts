import { LoadingState } from './loading.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
const LoadingFeatureSelector =
  createFeatureSelector<LoadingState>('feature_loading');

export const getAppLoadingSelector = createSelector(
  LoadingFeatureSelector,
  (state: LoadingState) => state.isLoading
);
