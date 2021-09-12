import { NzModalModule } from 'ng-zorro-antd/modal';
import { CoreRoutingModule } from './../../../routing/core/core-routing.module';
import { PostListCompModule } from './../../post/post-list-comp.module';
import { PostCreateCompModule } from './../../post/post-create-comp.module';
import { PostContainerCompModule } from './../../post/post-container-comp.module';
import { PostCardContentCompModule } from './../../post/post-card-content-comp.module';
import { PostRoutingModule } from './../../../routing/post/post-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsCompModule } from '../../post/posts-comp.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    PostCardContentCompModule,
    PostContainerCompModule,
    PostCreateCompModule,
    PostListCompModule,
    PostsCompModule,
    PostRoutingModule
  ]
})
export class CoreModule { }
