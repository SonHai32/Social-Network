import { GetAllPost, PostActions, GetAllPostSuccess } from './posts.actions';
import { PostsState } from './posts.state';
import { createReducer, on } from '@ngrx/store';

const initialState: PostsState = {
  isLoading: false,
  posts: [],
  page: 0,
}
export const PostsReducers = createReducer(initialState,
  on(GetAllPost, (state: PostsState) =>{
    return {
      ...state,
      isLoading: true
    }
  }),
  on(GetAllPostSuccess, (state: PostsState, {posts}) =>{
    return {
      ...state,
      isLoading: false,
      posts
    }
  })
  )
