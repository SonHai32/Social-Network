import { Post } from './../../models/post.model';
import { status } from './../../models/status.model';
import { GetAllPost, GetAllPostSuccess, PostsActions } from './posts.actions';
import { PostsState } from './posts.state';
import { createReducer, on } from '@ngrx/store';

const initialState: PostsState = {
  isLoading: false,
  posts: [],
  limit: 5,
  totalPost: 0,
  postUpload: {
    postUploaded: false,
    postUploading: false,
    postsUploadStatus: 'idle' as status,
  },
  postComment: {
    postCommentUploadStatus: 'idle',
    postCommentUploading: false,
    loadingPostComment: false,
  },
};
export const PostsReducers = createReducer(
  initialState,
  on(PostsActions.GetTotalPost, (state: PostsState) =>{
    return{
      ...state
    }
  }),
  on(PostsActions.GetTotalPostSuccess, (state: PostsState, {total}) =>{
    return {
      ...state,
      totalPost: total
    }
  }),
  on(GetAllPost, (state: PostsState, {limit}) => {
    return {
      ...state,
      isLoading: true,
      limit
    };
  }),
  on(GetAllPostSuccess, (state: PostsState, { posts }) => {
    return {
      ...state,
      isLoading: false,
      posts,
    };
  }),
  on(PostsActions.PostLike, (state: PostsState) => {
    return { ...state };
  }),
  on(PostsActions.PostLikeSuccess, (state: PostsState) => {
    return { ...state };
  }),
  on(PostsActions.PostUpload, (state: PostsState) => {
    return {
      ...state,
      postUpload: {
        ...state.postUpload,
        postUploading: true,
      },
    };
  }),
  on(PostsActions.PostUploadSuccess, (state: PostsState) => {
    return {
      ...state,
      postUpload: {
        postUploaded: true,
        postUploading: false,
        postsUploadStatus: 'success' as status,
      },
    };
  }),
  on(PostsActions.PostUploadFail, (state: PostsState) => {
    return {
      ...state,
      postUpload: {
        postUploaded: true,
        postUploading: false,
        postsUploadStatus: 'success' as status,
      },
    };
  }),
  on(PostsActions.PostUploadStatus, (state: PostsState, { status }) => {
    return {
      ...state,
      postUpload: {
        ...state.postUpload,
        postsUploadStatus: status,
      },
    };
  }),
  on(PostsActions.PostCommentUpload, (state: PostsState) => {
    return {
      ...state,
      postComment: {
        ...state.postComment,
        postCommentUploading: true,
      },
    };
  }),
  on(PostsActions.PostCommentSuccess, (state: PostsState) => {
    return {
      ...state,
      postComment: {
        ...state.postComment,
        postCommentUploading: false,
        postCommentUploadStatus: 'success' as status,
      },
    };
  }),
  on(PostsActions.PostCommentFail, (state: PostsState) => {
    return {
      ...state,
      postComment: {
        ...state.postComment,
        postCommentUploading: false,
        postCommentUploadStatus: 'error' as status,
      },
    };
  }),
);
