import { FromNowPipeModule } from '../from-now-pipe/from-now-pipe.module';
import { ScrollToCommentDirective } from '../../directives/scroll-to-comment.directive';
import { ScrollableDirective } from '../../directives/scrollable.directive';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PostCardContentComponent } from '../../components/post/post-card-content/post-card-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PostCardContentComponent, ScrollableDirective, ScrollToCommentDirective,
  ],
  imports: [
    CommonModule,
    NzAvatarModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTagModule,
    NzImageModule,
    NzInputModule,
    NzSpinModule,
    NzCommentModule,
    NzFormModule,
    FromNowPipeModule,
  ],
  exports: [PostCardContentComponent]
})
export class PostCardContentCompModule { }
