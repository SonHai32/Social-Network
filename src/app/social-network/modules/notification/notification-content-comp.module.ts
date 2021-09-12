import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { FromNowPipeModule } from '../from-now-pipe/from-now-pipe.module';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NotificationContentComponent } from '../../components/notification/notification-content/notification-content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NotificationContentComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzTypographyModule,
    NzAvatarModule,
    NzIconModule,
    NzBadgeModule,
    FromNowPipeModule,
    NzNotificationModule,
  ],
  exports: [NotificationContentComponent]
})
export class NotificationContentCompModule { }
