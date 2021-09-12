import { NoDataCompModule } from '../../layout/no-data-comp.module';
import { FriendSuggestionCardCompModule } from './friend-suggestion-card-comp.module';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FriendSuggestionsListComponent } from '../../../components/friends/friend-suggestions/friend-suggestions-list/friend-suggestions-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FriendSuggestionsListComponent],
  imports: [CommonModule, NzGridModule, NzSpinModule, FriendSuggestionCardCompModule, NoDataCompModule],
  exports: [FriendSuggestionsListComponent],
})
export class FriendSuggestionListCompModule {}
