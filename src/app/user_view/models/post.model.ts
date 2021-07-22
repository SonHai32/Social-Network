import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzImage } from 'ng-zorro-antd/image';
export interface Post{
  id?: string,
  create_by_username: string | null,
  avatar_url: string | null,
  created_at?: firebase.default.firestore.Timestamp | null,
  created_by_id: string ,
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



