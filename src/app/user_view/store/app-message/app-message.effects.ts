import { AppMessageAction } from './app-message.actions';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class AppMessageEffects {
  $setError = createEffect(() =>
    this.action$.pipe(
      ofType(AppMessageAction.SetAppMessage),
      map(() => AppMessageAction.ClearAppMessage())
    )
  );

  constructor(private action$: Actions) {}
}
