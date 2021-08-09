import { status } from './../../models/status.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Post } from './../../models/post.model';
import { createAction, props } from '@ngrx/store';
import { PostComment } from '../../models/comment.model';
export enum PostActionTypes {
  GET_TOTAL_POST = '[POSTS] Get Total Post',
  GET_TOTAL_POST_SUCCESS = '[POSTS] Get Total Post SUCCESS',
  GET_ALL_POSTS =  '[POSTS] Get All Post',
  GET_ALL_POSTS_SUCCESS = '[POSTS] Get All Posts Success',
  POST_LIKE = '[POSTS] Post Like',
  POST_LIKE_SUCCESS = '[POSTS] Post Like Success',
  POST_UPLOAD_STATUS = '[POSTS] Post Upload Status',
  POST_UPLOAD = '[POSTS] Post Upload',
  POST_UPLOAD_SUCCESS = '[POSTS] Upload Success',
  POST_UPLOAD_FAIL = '[POSTS] Upload Fail',
  POST_COMMENT = '[POSTS] Comment',
  POST_COMMENT_SUCCESS = '[POSTS] Comment Success',
  POST_COMMENT_FAIL = '[POSTS] Comment Fail',
}

export const GetTotalPost = createAction(PostActionTypes.GET_TOTAL_POST)

export const GetTotalPostSuccess = createAction(PostActionTypes.GET_TOTAL_POST_SUCCESS, props<{total: number}>())

export const GetAllPost = createAction(PostActionTypes.GET_ALL_POSTS, props<{limit: number, userID?: string}>())

export const GetAllPostSuccess = createAction(PostActionTypes.GET_ALL_POSTS_SUCCESS, props<{posts: Post[]}>())

export const PostLike = createAction(PostActionTypes.POST_LIKE, props<{postID: string, userID: string}>())

export const PostLikeSuccess = createAction(PostActionTypes.POST_LIKE_SUCCESS)

export const PostUpload = createAction(PostActionTypes.POST_UPLOAD, props<{post: Post, imageList? : NzUploadFile[] }>())

export const PostUploadStatus = createAction (PostActionTypes.POST_UPLOAD_STATUS, props<{status: status}>())

export const PostUploadSuccess = createAction(PostActionTypes.POST_UPLOAD_SUCCESS)

export const PostUploadFail = createAction(PostActionTypes.POST_UPLOAD_FAIL)

export const PostCommentUpload = createAction(PostActionTypes.POST_COMMENT, props<{comment: PostComment,isChild: boolean, commentID?: string, imageContent?: NzUploadFile}>())

export const PostCommentSuccess = createAction(PostActionTypes.POST_COMMENT_SUCCESS)

export const PostCommentFail = createAction(PostActionTypes.POST_COMMENT_FAIL)

export const PostsActions = {
  GetTotalPost,
  GetTotalPostSuccess,
  GetAllPost,
  GetAllPostSuccess,
  PostLike,
  PostLikeSuccess,
  PostUpload,
  PostUploadSuccess,
  PostUploadFail,
  PostUploadStatus,
  PostCommentUpload,
  PostCommentSuccess,
  PostCommentFail,
}
