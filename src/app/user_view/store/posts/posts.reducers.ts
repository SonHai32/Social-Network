import { GetAllPost, PostActions, GetAllPostSuccess } from './posts.actions';
import { PostsState } from './posts.state';
import { createReducer, on } from '@ngrx/store';
import { orderBy } from 'lodash-es';

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
    const sortPosts= orderBy([...posts], ['created_at'], 'desc')
    return {
      ...state,
      isLoading: false,
      posts: sortPosts
    }
  })
  )
