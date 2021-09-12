import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FriendInfoComponent } from '../../components/friends/friend-info/friend-info.component';
import { FriendSuggestionsCardComponent } from '../../components/friends/friend-suggestions/friend-suggestions-card/friend-suggestions-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FriendInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzAvatarModule,
    NzBadgeModule,
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
  ],
  exports: [FriendInfoComponent]
})
export class FriendInfoCompModule { }
