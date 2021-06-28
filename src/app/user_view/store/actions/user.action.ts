import { User } from '../../models/user.model';
import { Action, createAction, props } from '@ngrx/store';

export const USER_LOGIN             = '[USER] LOGIN'
export const USER_LOGIN_COMPLETE    = '[USER] LOGIN_COMPLETE'
export const USER_LOGIN_ERROR       = '[USER] LOGIN_ERROR'
export const USER_LOGOUT            = '[USER] LOGOUT'

export const userLogin              = createAction(USER_LOGIN, props<{user: User}>())
export const userLoginComplete      = createAction(USER_LOGIN_COMPLETE, props<{user: User}>())
export const userLoginError         = createAction(USER_LOGIN_ERROR, props<{errorMessage: string}>())
export const userLogout             = createAction(USER_LOGOUT)

