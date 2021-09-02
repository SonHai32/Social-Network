
import { createAction, props } from '@ngrx/store';
import { UserCredentials } from '../../models/user-credentials.model';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  CHECK_AUTH              = '[AUTH] Check Auth',
  LOGIN                   = '[AUTH] Login',
  GOOGLE_LOGIN            = '[AUTH] Google Login',
  REGISTER                = '[AUTH] Register',
  AUTH_FAIL               = '[AUTH] Fail',
  AUTH_SUCCESS            = '[AUTH] Success',
  LOGOUT                  = '[AUTH] Logout',
  LOGOUT_SUCCESS          = '[AUTH] Logout Success'
}


export const CheckAuth                  = createAction(AuthActionTypes.CHECK_AUTH)
export const LoginWithPopup                = createAction(AuthActionTypes.GOOGLE_LOGIN, props<{popupType: 'FACEBOOK' | 'GOOGLE' | 'GITHUB'}>())
export const Login                      = createAction(AuthActionTypes.LOGIN, props<{userCredentials: UserCredentials}>())
export const Register                   = createAction(AuthActionTypes.REGISTER, props<{userCredentials: UserCredentials}>())
export const AuthFail                   = createAction(AuthActionTypes.AUTH_FAIL, props<{errorMessage: string}>())
export const AuthSuccess                = createAction(AuthActionTypes.AUTH_SUCCESS, props<{user: User}>())
export const Logout                     = createAction(AuthActionTypes.LOGOUT)
export const LogoutSuccess              = createAction(AuthActionTypes.LOGOUT_SUCCESS)

export const AuthActions = {
  CheckAuth,
  Login,
  LoginWithPopup,
  Logout,
  Register,
  AuthFail,
  AuthSuccess,
  LogoutSuccess
}
