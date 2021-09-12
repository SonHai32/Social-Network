import { FriendRequetsCardCompModule } from './friend-requets-card-comp.module';
import { NoDataCompModule } from '../../layout/no-data-comp.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FriendRequestListComponent } from '../../../components/friends/friend-request/friend-request-list/friend-request-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FriendRequestListComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzSpinModule,
    NoDataCompModule,
    FriendRequetsCardCompModule
  ],
  exports: [FriendRequestListComponent]
})
export class FriendRequetsListCompModule { }
