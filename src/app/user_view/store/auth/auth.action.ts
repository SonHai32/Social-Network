import { User } from '../../models/user.model';
import { createAction, props } from '@ngrx/store';
import { UserCredentials } from '../../models/user-credentials.model';

export enum AuthActionTypes {
  GET_AUTH      = '[AUTH] Get Auth',
  LOGIN         = '[AUTH] Login',
  REGISTER      = '[AUTH] Register',
  AUTH_FAIL     = '[AUTH] Fail',
  AUTH_SUCCESS  = '[AUTH] Success',
  LOGOUT        = '[AUTH] Logout'
}


export const GetAuth                    = createAction(AuthActionTypes.GET_AUTH)
export const Login                      = createAction(AuthActionTypes.LOGIN, props<{userCredentials: UserCredentials}>())
export const Register                   = createAction(AuthActionTypes.REGISTER, props<{userCredentials: UserCredentials}>())

export const AuthFail                   = createAction(AuthActionTypes.AUTH_FAIL, props<{errorMessage: string}>())
export const AuthSuccess                = createAction(AuthActionTypes.AUTH_SUCCESS, props<{user: User}>())
export const Logout                     = createAction(AuthActionTypes.LOGOUT)

export const AuthActions = {
  GetAuth,
  Login,
  Logout,
  Register,
  AuthFail,
  AuthSuccess
}
