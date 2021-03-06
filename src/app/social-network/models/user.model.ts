import { Hobby } from './hobby.model';
export interface User {
  id: string;
  email: string | null;
  display_name: string;
  birthday?: string;
  phone?: string;
  created_at?: firebase.default.firestore.Timestamp | null;
  avatar_url: string | null;
  posts?: [];
  friends?: [];
  friend_requests?: User[];
  messages?: [];
  gender?: string;
  place?: string;
  hobbies?: Hobby[];
  biolink?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}
