import { UserDisplayNameFilterPipe } from '../../pipes/user-display-name-filter.pipe';
import { FriendInfoCompModule } from './friend-info-comp.module';
import { NoDataCompModule } from '../layout/no-data-comp.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from '../../components/friends/friends-list/friends-list.component';



@NgModule({
  declarations: [FriendsListComponent, UserDisplayNameFilterPipe],
  imports: [
    CommonModule,
    ScrollingModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzSpinModule,
    NoDataCompModule,
    FriendInfoCompModule
  ],
  exports: [FriendsListComponent]
})
export class FriendListCompModule { }
