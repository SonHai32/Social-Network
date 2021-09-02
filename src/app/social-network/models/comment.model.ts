export interface PostComment{
  id?: string,
  postID: string;
  avatar_url? : string | null,
  created_by_id: string,
  created_by_display_name: string,
  created_at: firebase.default.firestore.Timestamp,
  commentText?: string,
  imageUrl?: string,
  child_comments?: PostComment[]
}
