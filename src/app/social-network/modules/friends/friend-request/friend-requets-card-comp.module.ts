import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FriendRequestCardComponent } from '../../../components/friends/friend-request/friend-request-card/friend-request-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FriendRequestCardComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
  ],
  exports: [FriendRequestCardComponent],
})
export class FriendRequetsCardCompModule {}
