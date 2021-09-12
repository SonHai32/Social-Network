import { AppMessageReducers } from '../store/app-message/app-message.reducer';
import { AppMessageEffects } from '../store/app-message/app-message.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    StoreModule.forFeature('app_message_feature', AppMessageReducers),
    EffectsModule.forFeature([AppMessageEffects]),
  ],
})
export class AppMessageModule {}
