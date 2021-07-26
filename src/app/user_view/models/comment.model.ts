export interface Comment{
  id?: string,
  postID: string;
  created_by_id?: string,
  comment: string,
  imageUrl?: string,
  child_comments?: Comment[]
}
