import { status } from './../../models/status.model';
import { GetAllPost, GetAllPostSuccess, PostsActions } from './posts.actions';
import { PostsState } from './posts.state';
import { createReducer, on } from '@ngrx/store';

const initialState: PostsState = {
  isLoading: false,
  posts: [],
  page: 0,
  postUpload: {
    postUploaded: false,
    postUploading: false,
    postsUploadStatus: 'idle' as status,
  },
};
export const PostsReducers = createReducer(
  initialState,
  on(GetAllPost, (state: PostsState) => {
    return {
      ...state,
      isLoading: true,
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
  })
);
