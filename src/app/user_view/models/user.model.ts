export interface User{
  id: string,
  email: string,
  display_name: string,
  birthday?: string,
  phone?: string,
  created_at?: firebase.default.firestore.Timestamp,
  avatar_url: string,
  posts?: [],
  friends?: [],
  messages?: [],
}


