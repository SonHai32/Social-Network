import { NzImageModule } from 'ng-zorro-antd/image';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PostCreateComponent } from '../../components/post/post-create/post-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PostCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzGridModule,
    NzAvatarModule,
    NzInputModule,
    NzImageModule,
    NzTagModule,
    NzBadgeModule,
    NzUploadModule,
    NzButtonModule,
  ],
  exports: [PostCreateComponent]
})
export class PostCreateCompModule { }
