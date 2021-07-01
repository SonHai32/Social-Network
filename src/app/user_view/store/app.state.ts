import { AuthState } from './auth/auth.state';
import { User } from '../models/user.model';

export interface AppState{
  auth_feature: AuthState
}
