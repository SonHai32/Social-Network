import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MessageListItemComponent } from '../../components/message/message-list-item/message-list-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MessageListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzAvatarModule,
    NzTypographyModule,
    NzSkeletonModule,
    NzIconModule,
  ],
  exports: [MessageListItemComponent]
})
export class MessageListItemCompModule { }
