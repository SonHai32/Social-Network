import { PostCreateCompModule } from './post-create-comp.module';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PostContainerComponent } from '../../components/post/post-container/post-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PostContainerComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzModalModule,
    NzAvatarModule,
    NzTypographyModule,
    PostCreateCompModule,
  ],
  exports:[PostContainerComponent]

})
export class PostContainerCompModule { }
