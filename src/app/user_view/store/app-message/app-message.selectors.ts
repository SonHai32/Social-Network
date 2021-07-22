import { AppState } from '../app.state';
import { AppMessageState } from './app-message.state';
import { createSelector, createFeatureSelector} from '@ngrx/store';

export const AppMessageFeature = createFeatureSelector<AppMessageState>('app_message_feature')

export const getAppMessageSelector = createSelector(AppMessageFeature, (state: AppMessageState) => state)



export const AppMessageSelector = {
  getAppMessageSelector,
}
