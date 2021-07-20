import { createAction, props} from '@ngrx/store';


export enum ErrorTypes{
  SET_ERROR     =   '[ERROR] SET_ERROR',
  CLEAR_ERROR   =   '[ERROR] CLEAR_ERROR'
}


export const SetError = createAction(ErrorTypes.SET_ERROR, props<{errorMessage: string}>())
export const ClearError = createAction(ErrorTypes.CLEAR_ERROR)


export const ErrorActions = {
  SetError,
  ClearError
}
