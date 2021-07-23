import { Post } from './../../models/post.model';
export interface PostsState {
  posts: Post[],
  isLoading: boolean,
  page?: number
}
