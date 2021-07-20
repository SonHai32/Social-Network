import { ErrorState } from './error.state';
import { createSelector, createFeatureSelector} from '@ngrx/store';

export const ErrorFeatureSelector = createFeatureSelector<ErrorState>('feature_error')

export const getErrorSelector = createSelector(ErrorFeatureSelector, (state: ErrorState) => state)
export const getErrorMessageSelector = createSelector(ErrorFeatureSelector, (state: ErrorState) => state.errorMessage)
export const getHasErrorSelector = createSelector(ErrorFeatureSelector, (state: ErrorState) => state.hasError)


export const ErrorSelector = {
  getErrorMessageSelector,
  getHasErrorSelector,
  getErrorSelector
}
