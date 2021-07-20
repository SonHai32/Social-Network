import { ErrorState } from './error.state';
import { ErrorActions } from './error.actions';
import { createReducer, on } from '@ngrx/store';

const initialState: ErrorState = {
  hasError: false,
  errorMessage: '',
};
export const ErrorReducer = createReducer(
  initialState,
  on(ErrorActions.SetError, (state: ErrorState, {errorMessage}) => {
    return { ...state, hasError: true, errorMessage };
  }),
  on(ErrorActions.ClearError, (state => {return {hasError: false, errorMessage: ''}}))
);
