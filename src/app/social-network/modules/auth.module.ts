import { EffectsModule } from '@ngrx/effects';
import { authReducer } from '../store/auth/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { AuthEffects } from '../store/auth/auth.effects';
@NgModule({
  imports: [
    StoreModule.forFeature('feature_auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule{}
