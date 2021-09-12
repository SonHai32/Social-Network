import { NzIconModule } from 'ng-zorro-antd/icon';
import { NoDataCompModule } from '../layout/no-data-comp.module';
import { NotificationContentCompModule } from './notification-content-comp.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NotificationListComponent } from '../../components/notification/notification-list/notification-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NotificationListComponent],
  imports: [
    CommonModule,
    NzGridModule,
    ScrollingModule,
    NzIconModule,
    NotificationContentCompModule,
    NoDataCompModule
  ],
  exports: [NotificationListComponent]
})
export class NotificationListCompModule { }
