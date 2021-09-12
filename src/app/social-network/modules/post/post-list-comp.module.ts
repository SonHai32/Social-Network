import { NoDataCompModule } from './../layout/no-data-comp.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PostCreateCompModule } from './post-create-comp.module';
import { PostContainerCompModule } from './post-container-comp.module';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { PostCardContentCompModule } from './post-card-content-comp.module';
import { PostListComponent } from '../../components/post/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PostListComponent],
  imports: [
    CommonModule,
    NzSkeletonModule,
    NzGridModule,
    PostCardContentCompModule,
    PostContainerCompModule,
    PostCreateCompModule,
    PostCardContentCompModule,
    PostContainerCompModule,
    NoDataCompModule,
  ],
  exports: [PostListComponent]
})
export class PostListCompModule { }
