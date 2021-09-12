import { FriendListCompModule } from './../../friends/friend-list-comp.module';
import { FriendInfoCompModule } from './../../friends/friend-info-comp.module';
import { FriendCompModule } from './../../friends/friend-comp.module';
import { FriendRoutingModule } from './../../../routing/friend/friend-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendRequetsCardCompModule } from '../../friends/friend-request/friend-requets-card-comp.module';
import { FriendRequetsListCompModule } from '../../friends/friend-request/friend-requets-list-comp.module';
import { FriendSuggestionCardCompModule } from '../../friends/friend-suggestion/friend-suggestion-card-comp.module';
import { FriendSuggestionListCompModule } from '../../friends/friend-suggestion/friend-suggestion-list-comp.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FriendRoutingModule,
    FriendRequetsCardCompModule,
    FriendRequetsListCompModule,
    FriendSuggestionCardCompModule,
    FriendSuggestionListCompModule,
    FriendCompModule,
    FriendInfoCompModule,
    FriendListCompModule,
  ],
})
export class FriendModule {}
