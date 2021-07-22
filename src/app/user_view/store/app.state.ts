import { LoadingState } from './app-loading/loading.state';
import { AppMessageState } from './app-message/app-message.state';
import { AuthState } from './auth/auth.state';

export interface AppState{
  auth_feature: AuthState,
  app_message_feature: AppMessageState
  loading_feature: LoadingState,
}
