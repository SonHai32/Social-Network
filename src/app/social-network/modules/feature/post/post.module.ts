import { PostsCompModule } from './../../post/posts-comp.module';
import { PostListCompModule } from './../../post/post-list-comp.module';
import { PostCreateCompModule } from './../../post/post-create-comp.module';
import { PostContainerCompModule } from './../../post/post-container-comp.module';
import { PostCardContentCompModule } from './../../post/post-card-content-comp.module';
import { PostRoutingModule } from './../../../routing/post/post-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostRoutingModule,
    PostCardContentCompModule,
    PostContainerCompModule,
    PostCreateCompModule,
    PostListCompModule,
    PostsCompModule,
  ]
})
export class PostModule { }
