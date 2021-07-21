import { LoadingState } from './app-loading/loading.state';
import { ErrorState } from './error/error.state';
import { AuthState } from './auth/auth.state';

export interface AppState{
  auth_feature: AuthState,
  error_feature: ErrorState
  loading_feature: LoadingState
}
