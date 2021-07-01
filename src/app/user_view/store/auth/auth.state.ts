import { UserCredentials } from "../../models/user-credentials.model";
import { User } from "../../models/user.model";

export interface AuthState {
  userCredentials? : UserCredentials | null,
  user: User | null;
  isLoading: boolean;
  authenticated: boolean;
  hasError: boolean;
  errorMessage: string;
}
