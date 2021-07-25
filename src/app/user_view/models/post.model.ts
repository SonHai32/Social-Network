import { NzImage } from 'ng-zorro-antd/image';
import * as moment from 'moment'
import firebase from 'firebase/app'
export interface Post{
  id?: string,
  create_by_username: string | null,
  avatar_url: string | null,
  created_at?: firebase.firestore.Timestamp | Date | moment.Moment,
  created_by_id: string ,
  liked_by_user_id?: string[],
  post_content: {
    text_content?: string,
    image_content?: NzImage[],
    hashtag?: string[],
    friend_tag?: string[],
    pin_location?: {
      long: number,
      lat: number
    }
  }
}



