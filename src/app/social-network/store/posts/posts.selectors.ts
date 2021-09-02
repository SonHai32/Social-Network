import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const PostsFeatureSelector = createFeatureSelector<PostsState>('posts_feature')
export const getPostsSelector = createSelector(PostsFeatureSelector, state => state.posts);
export const getPostLoading = createSelector(PostsFeatureSelector, state => state.isLoading);
export const getTotalPost = createSelector(PostsFeatureSelector, state => state.totalPost);
export const getPostLimit  = createSelector(PostsFeatureSelector, state => state.limit);
export const getPostUploading = createSelector(PostsFeatureSelector, state => state.postUpload.postUploading)
export const getPostUploadStatus = createSelector(PostsFeatureSelector, state => state.postUpload.postsUploadStatus)
export const getPostCommentUploading = createSelector(PostsFeatureSelector, state =>  state.postComment.postCommentUploading)


export const PostSelectors = {
  getPostsSelector,
  getPostLoading,
  getPostUploading,
  getPostUploadStatus,
  getPostCommentUploading,
  getTotalPost,
  getPostLimit
}
