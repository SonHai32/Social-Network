import { ErrorActions } from './error.actions';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

@Injectable()
export class ErrorEffect {
  $setError = createEffect(() =>
    this.action$.pipe(
      ofType(ErrorActions.SetError),
      map(() => ErrorActions.ClearError())
    )
  );

  constructor(private action$: Actions) {}
}
