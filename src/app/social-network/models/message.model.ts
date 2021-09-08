import { NzImage } from 'ng-zorro-antd/image';
export interface PrivateMessage {
  id?: string,
  sendByID: string;
  textMessage?: string;
  imageMessage?: NzImage[];
  created_at: firebase.default.firestore.Timestamp;
}
