import { PostListCompModule } from './post-list-comp.module';
import { PostCreateCompModule } from './post-create-comp.module';
import { PostContainerCompModule } from './post-container-comp.module';
import { PostCardContentCompModule } from './post-card-content-comp.module';
import { PostsEffects } from '../../store/posts/posts.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { PostsReducers } from '../../store/posts/posts.reducers';
@NgModule({
  imports: [
    StoreModule.forFeature('posts_feature', PostsReducers),
    EffectsModule.forFeature([PostsEffects]),
    PostCardContentCompModule,
    PostContainerCompModule,
    PostCreateCompModule,
    PostListCompModule
  ],
})
export class PostsCompModule {}
