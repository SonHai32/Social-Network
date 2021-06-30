import { User } from '../../models/user.model';
import { ActionType, createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  //LOGIN ACTION
  CHECK_LOGIN = '[AUTH] Check Login',
  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[AUTH] Login Success',
  LOGIN_FAIL = '[AUTH] Login Fail',

  //REGISTER ACTION
  REGISTER = '[AUTH] Register',
  REGISTER_SUCCESS = '[AUTH] Register Success',
  REGISTER_FAIL = '[AUTH] Register Fail',

  LOGOUT = '[AUTH] Logout'
}


export const CheckLogin              = createAction(AuthActionTypes.CHECK_LOGIN)
export const Login                   = createAction(AuthActionTypes.LOGIN, props<{user: User}>())
export const LoginComplete           = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{user: User}>())
export const LoginFail              = createAction(AuthActionTypes.REGISTER_FAIL, props<{errorMessage: string}>())
export const Logout                  = createAction(AuthActionTypes.LOGOUT)

export const Register                = createAction(AuthActionTypes.REGISTER, props<{user: User}>())
export const RegisterSuccess         = createAction(AuthActionTypes.REGISTER_SUCCESS, props<{user: User}>())
export const RegisterFail            = createAction(AuthActionTypes.REGISTER_FAIL, props<{errorMessage: string}>())


export const AuthActions = {
  CheckLogin,
  Login,
  LoginComplete,
  LoginFail,
  Logout,
  Register,
  RegisterSuccess,
  RegisterFail
}
