import { Post } from './../../models/post.model';
import { AppMessageAction } from './../app-message/app-message.actions';
import { GetAllPost, GetAllPostSuccess } from './posts.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../services/post/posts/posts.service';
import { mapTimestamp } from '../../utils/operators';
@Injectable()
export class PostsEffects{

  getAllPosts$ = createEffect(() =>
    this.action$.pipe(
      ofType(GetAllPost),
      mergeMap(() => this.postService.getAllPosts()),
      mapTimestamp(),
      map((posts: Post[]) => GetAllPostSuccess({posts})),
      catchError(err => of(AppMessageAction.SetAppMessage({message: err.message, message_type: 'error'})))
    )
  )

  constructor(private action$: Actions, private postService: PostsService){

  }
}
