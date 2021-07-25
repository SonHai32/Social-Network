import { Store } from '@ngrx/store';
import { status } from './../../models/status.model';
import { PostCreateService } from './../../services/post/post-create/post-create.service';
import { User } from './../../models/user.model';
import { Post } from './../../models/post.model';
import { AppMessageAction } from './../app-message/app-message.actions';
import {
  GetAllPost,
  GetAllPostSuccess,
  PostsActions,
  PostLike,
} from './posts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  mergeMap,
  catchError,
  map,
  exhaustMap,
  tap,
  timeout,
  switchMap,
} from 'rxjs/operators';
import { of, merge } from 'rxjs';
import { PostsService } from '../../services/post/posts/posts.service';
import { mapTimestamp } from '../../utils/operators';
@Injectable()
export class PostsEffects {
  getAllPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(GetAllPost),
      mergeMap(() =>
        this.postService.getAllPosts().pipe(
          map((res) => {
            return res.map((val) => {
              return {
                ...(val.payload.doc.data() as Post),
                id: val.payload.doc.id,
              };
            });
          })
        )
      ),
      mapTimestamp(),
      map((posts: Post[]) => GetAllPostSuccess({ posts })),
      catchError((err) =>
        of(
          AppMessageAction.SetAppMessage({
            message: err.message,
            message_type: 'error',
          })
        )
      )
    )
  );

  postLikeUpdate$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostLike),
      mergeMap((action) =>
        this.postService.postUpdateLike(action.postID, action.userID)
      ),
      map(() =>
        AppMessageAction.SetAppMessage({
          message: `Đã thích bài viết`,
          message_type: 'success',
        })
      ),
      catchError((err) =>
        of(
          AppMessageAction.SetAppMessage({
            message: err.message,
            message_type: 'error',
          })
        )
      )
    )
  );

  postUpload$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostsActions.PostUpload),
      switchMap(action => this.postCreateService.postUpload(action.post, action.imageList)),
      tap(status =>{
        if(status === 'error' || status === 'idle'){
          PostsActions.PostUploadFail()
          this.store.dispatch(AppMessageAction.SetAppMessage({message: 'Đăng bài thất bại', message_type: 'error'}))
        }else{
          this.store.dispatch(PostsActions.PostUploadSuccess())
          this.store.dispatch(AppMessageAction.SetAppMessage({message: 'Đăng bài thành công', message_type: 'success'}))
        }
      }),
      map((uploadStatus: status) =>
       PostsActions.PostUploadStatus({status: uploadStatus})
      ),
      catchError((err) =>
        merge(
          of(
            AppMessageAction.SetAppMessage({
              message: err.message,
              message_type: 'error',
            })
          ),
          of(PostsActions.PostUploadStatus({ status: 'error' }))
        )
      )
    ), {dispatch: true}
  );

  constructor(
    private action$: Actions,
    private postService: PostsService,
    private postCreateService: PostCreateService,
    private store: Store
  ) {}
}
