import { User } from 'src/app/social-network/models/user.model';
import { NzImage } from 'ng-zorro-antd/image';
export interface Message{
  id?: string,
  messageText?: string,
  messageImages?: NzImage[],
  created_at: firebase.default.firestore.Timestamp ,
  send_by: User
}
