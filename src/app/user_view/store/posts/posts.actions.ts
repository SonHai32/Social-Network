import { Post } from './../../models/post.model';
import { ActionType, createAction, props } from '@ngrx/store';
export enum PostActionTypes {
  GET_ALL_POSTS =  '[POSTS] Get All Post',
  GET_ALL_POSTS_SUCCESS = '[POSTS] Get All Posts Success'
}

export const GetAllPost = createAction(PostActionTypes.GET_ALL_POSTS)

export const GetAllPostSuccess = createAction(PostActionTypes.GET_ALL_POSTS_SUCCESS, props<{posts: Post[]}>())

export type PostActions =  ActionType<typeof GetAllPost> | ActionType<typeof GetAllPostSuccess>
