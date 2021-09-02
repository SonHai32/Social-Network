import { createAction, props } from '@ngrx/store';
export const SET_LOADING = '[LOADING] Is Loading ...'
export const CLEAR_LOADING = '[LOADING] Loaded'


export const SetLoading = createAction(SET_LOADING)
export const ClearLoading = createAction(CLEAR_LOADING)


export const LoadingActions = {
  SetLoading,
  ClearLoading
}
