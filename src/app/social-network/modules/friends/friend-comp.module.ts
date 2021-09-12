import { FriendSuggestionListCompModule } from './friend-suggestion/friend-suggestion-list-comp.module';
import { FriendRequetsListCompModule } from './friend-request/friend-requets-list-comp.module';
import { RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FriendComponent } from '../../components/friends/friend/friend.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListCompModule } from './friend-list-comp.module';



@NgModule({
  declarations: [FriendComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzTabsModule,
    FriendRequetsListCompModule,
    FriendSuggestionListCompModule,
    FriendListCompModule,
  ],
  exports: [FriendComponent]
})
export class FriendCompModule { }
