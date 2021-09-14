import { ImageDisplayCompModule } from './../image-display-comp/image-display-comp.module';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToHoursPipeModule } from './../to-hours-pipe/to-hours-pipe.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { MessageBoxComponent } from '../../components/message/message-box/message-box.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MessageBoxComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzTypographyModule,
    NzAvatarModule,
    NzIconModule,
    NzCommentModule,
    NzToolTipModule,
    NzInputModule,
    NzButtonModule,
    NzUploadModule,
    NzImageModule,
    NzSpinModule,
    FormsModule,
    ImageDisplayCompModule,
    ToHoursPipeModule,
    ScrollingModule,
  ],
  exports: [MessageBoxComponent]
})
export class MessageBoxCompModule { }
