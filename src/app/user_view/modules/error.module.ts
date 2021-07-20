import { ErrorEffect } from './../store/error/error.effects';
import { EffectsModule } from '@ngrx/effects';
import { ErrorReducer } from './../store/error/error.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';


@NgModule({
  imports: [StoreModule.forFeature('feature_error', ErrorReducer), EffectsModule.forFeature([ErrorEffect])]
})
export class ErrorModule{}
