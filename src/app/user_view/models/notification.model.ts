import { User } from 'src/app/user_view/models/user.model';
export interface Notification{
  byUser: User,
  created_at: firebase.default.firestore.Timestamp,
  title: string,
  seen: boolean,
  type: 'message' | 'friend_request'
}
