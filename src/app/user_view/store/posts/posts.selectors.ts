import { PostsState } from './posts.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
const PostsFeatureSelector = createFeatureSelector<PostsState>('posts_feature')

export const getPostsSelector = createSelector(PostsFeatureSelector, state => state.posts);
export const getPostLoading = createSelector(PostsFeatureSelector, state => state.isLoading);


export const getPostUploading = createSelector(PostsFeatureSelector, state => state.postUpload.postUploading)
export const getPostUploadStatus = createSelector(PostsFeatureSelector, state => state.postUpload.postsUploadStatus)


export const PostSelectors = {
  getPostsSelector,
  getPostLoading,
  getPostUploading,
  getPostUploadStatus,
}
