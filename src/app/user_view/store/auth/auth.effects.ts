import { Store } from '@ngrx/store';
import { LoadingActions } from './../app-loading/loading.actions';
import { AppMessageAction } from '../app-message/app-message.actions';
import { AuthActions } from './auth.action';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  exhaustMap,
  timeout,
  timeoutWith,
  tap,
  switchMap,
} from 'rxjs/operators';
import { iif, merge, of } from 'rxjs';
import firebase from 'firebase/app';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.CheckAuth),
      tap(() => this.store.dispatch(LoadingActions.SetLoading())),
      switchMap(() => this.authService.checkAuth()),
      map((user: User| null) => {
        if (user) {
          return AuthActions.AuthSuccess({ user });
        } else {
          return AuthActions.AuthFail({ errorMessage: 'Bạn chưa đăng nhập' });
        }
      }),
      tap(() => this.store.dispatch(LoadingActions.ClearLoading())),
      catchError((err) =>
        of(
          AppMessageAction.SetAppMessage({
            message: err.message,
            message_type: 'error',
          }) && LoadingActions.ClearLoading()
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Login),
      exhaustMap((action) =>
        this.authService.loginWithEmailAndPassword(action.userCredentials).pipe(
          map((user: User) => AuthActions.AuthSuccess({ user })),
          catchError((error: firebase.FirebaseError) =>
            merge(
              of(AuthActions.AuthFail({ errorMessage: error.message })),
              of(
                AppMessageAction.SetAppMessage({
                  message: error.message,
                  message_type: 'error',
                })
              )
            )
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Register),
      exhaustMap((action) =>
        this.authService
          .createuserwithemailandpassword(action.userCredentials)
          .pipe(
            map((user: User) => AuthActions.AuthSuccess({ user })),
            catchError((error: firebase.FirebaseError) =>
              merge(
                of(AuthActions.AuthFail({ errorMessage: error.message })),
                of(
                  AppMessageAction.SetAppMessage({
                    message: error.message,
                    message_type: 'error',
                  })
                )
              )
            )
          )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Logout),
      tap(() => this.store.dispatch(LoadingActions.SetLoading())),
      switchMap(() => this.authService.logOut()),
      map(() => AuthActions.LogoutSuccess()),
      tap(() => this.store.dispatch(LoadingActions.ClearLoading())),
      catchError((err) =>
        of(
          AppMessageAction.SetAppMessage({
            message: err.message,
            message_type: 'error',
          })
        )
      )
    )
  );

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginWithPopup),
      exhaustMap((action) =>
        this.authService.signInWithPopup(action.popupType).pipe(
          timeout(60000),
          map((user: User) => AuthActions.AuthSuccess({ user })),
          catchError((err) =>
            merge(
              of(
                AuthActions.AuthFail({
                  errorMessage: 'Lỗi quá thời gian kết nối',
                })
              ),
              of(
                AppMessageAction.SetAppMessage({
                  message: err.message,
                  message_type: 'error',
                })
              )
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store
  ) {}
}
