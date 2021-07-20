
import firebase from 'firebase';
import { createAction, props } from '@ngrx/store';
import { UserCredentials } from '../../models/user-credentials.model';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  LOGIN           = '[AUTH] Login',
  REGISTER        = '[AUTH] Register',
  AUTH_FAIL       = '[AUTH] Fail',
  AUTH_SUCCESS    = '[AUTH] Success',
  LOGOUT          = '[AUTH] Logout'
}


export const Login                      = createAction(AuthActionTypes.LOGIN, props<{userCredentials: UserCredentials}>())
export const Register                   = createAction(AuthActionTypes.REGISTER, props<{userCredentials: UserCredentials}>())

export const AuthFail                   = createAction(AuthActionTypes.AUTH_FAIL, props<{errorMessage: string}>())
export const AuthSuccess                = createAction(AuthActionTypes.AUTH_SUCCESS, props<{user: User}>())
export const Logout                     = createAction(AuthActionTypes.LOGOUT)

export const AuthActions = {
  Login,
  Logout,
  Register,
  AuthFail,
  AuthSuccess
}
