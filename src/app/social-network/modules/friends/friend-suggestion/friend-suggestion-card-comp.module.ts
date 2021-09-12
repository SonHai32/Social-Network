import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendSuggestionsCardComponent } from 'src/app/social-network/components/friends/friend-suggestions/friend-suggestions-card/friend-suggestions-card.component';



@NgModule({
  declarations: [FriendSuggestionsCardComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzAvatarModule,
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
  ],
  exports: [FriendSuggestionsCardComponent]
})
export class FriendSuggestionCardCompModule { }
