import { status } from '../../models/status.model';
import { Post } from '../../models/post.model';
export interface PostsState {
  posts: Post[],
  isLoading: boolean,
  limit: number,
  totalPost: number,
  postUpload: {
    postUploading: boolean,
    postsUploadStatus: status
    postUploaded: boolean
  },
  postComment:{
    postCommentUploading: boolean,
    postCommentUploadStatus: status,
    loadingPostComment: boolean,
  }
}
