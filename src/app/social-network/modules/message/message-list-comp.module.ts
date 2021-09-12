import { NoDataCompModule } from '../layout/no-data-comp.module';
import { MessageListItemCompModule } from './message-list-item-comp.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from '../../components/message/message-list/message-list.component';



@NgModule({
  declarations: [MessageListComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzTypographyModule,
    NzSpinModule,
    ScrollingModule,
    MessageListItemCompModule,
    NoDataCompModule,
  ],
  exports: [MessageListComponent]
})
export class MessageListCompModule { }
