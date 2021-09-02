import { PostsEffects } from '../store/posts/posts.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { PostsReducers } from '../store/posts/posts.reducers';
@NgModule({
  imports: [
    StoreModule.forFeature('posts_feature', PostsReducers),
    EffectsModule.forFeature([PostsEffects]),
  ],
})
export class PostsModule {}
