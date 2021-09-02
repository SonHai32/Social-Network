import { PostComment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { Store } from '@ngrx/store';
import { status } from '../../models/status.model';
import { Post } from '../../models/post.model';
import { AppMessageAction } from '../app-message/app-message.actions';
import {
  GetAllPost,
  GetAllPostSuccess,
  PostsActions,
  PostLike,
} from './posts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, catchError, map, tap, switchMap } from 'rxjs/operators';
import { of, merge } from 'rxjs';
import { mapTimestamp } from '../../utils/operators';
import { PostsService } from '../../services/posts.service';
@Injectable()
export class PostsEffects {
  getTotalPost$ = createEffect(() =>
    this.action$.pipe(
      ofType(PostsActions.GetTotalPost),
      mergeMap(() => this.postService.getTotalPost()),
      map((total) => PostsActions.GetTotalPostSuccess({ total }))
    )
  );
  getAllPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(GetAllPost),
      mergeMap((action) =>
        this.postService.getAllPosts(action.limit, action.userID).pipe(
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
      map(() => {
        return PostsActions.PostLikeSuccess();
      }),
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

  postUpload$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(PostsActions.PostUpload),
        switchMap((action) =>
          this.postService.postUpload(action.post, action.imageList)
        ),
        tap((status) => {
          if (status === 'error' || status === 'idle') {
            PostsActions.PostUploadFail();
            this.store.dispatch(
              AppMessageAction.SetAppMessage({
                message: 'Đăng bài thất bại',
                message_type: 'error',
              })
            );
          } else {
            this.store.dispatch(PostsActions.PostUploadSuccess());
            this.store.dispatch(
              AppMessageAction.SetAppMessage({
                message: 'Đăng bài thành công',
                message_type: 'success',
              })
            );
          }
        }),
        map((uploadStatus: status) =>
          PostsActions.PostUploadStatus({ status: uploadStatus })
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
      ),
    { dispatch: true }
  );

  postComment$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(PostsActions.PostCommentUpload),
        switchMap((action) =>
          this.commentService.postComment(
            action.isChild,
            action.comment,
            action.commentID
          )
        ),
        tap((status) => {
          if (status === 'error' || status === 'idle') {
            PostsActions.PostCommentFail();
          } else {
            this.store.dispatch(PostsActions.PostCommentSuccess());
          }
        }),
        map(() =>
          AppMessageAction.SetAppMessage({
            message: 'Đã bình luận bài viết',
            message_type: 'success',
          })
        ),
        catchError((err) =>
          merge(
            of(
              AppMessageAction.SetAppMessage({
                message: err.message,
                message_type: 'error',
              })
            ),
            of(PostsActions.PostCommentFail())
          )
        )
      ),
    { dispatch: true }
  );
  constructor(
    private action$: Actions,
    private postService: PostsService,
    private commentService: CommentService,
    private store: Store
  ) {}
}
