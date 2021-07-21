import { LoadingActions } from './loading.actions';
import { LoadingState } from './loading.state';
import { createReducer, on } from '@ngrx/store';

const initialLoadingState: LoadingState = {
  isLoading: false,
};
export const LoadingReducer = createReducer(
  initialLoadingState,
  on(LoadingActions.SetLoading, () => {
    return {
      isLoading: true,
    };
  }),
  on(LoadingActions.ClearLoading, () => {
    return { isLoading: false };
  })
);
