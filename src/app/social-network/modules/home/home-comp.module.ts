import { FooterCompModule } from './../layout/footer-comp.module';
import { HeaderCompModule } from './../layout/header-comp.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FriendListCompModule } from '../friends/friend-list-comp.module';
import { PaneMenuCompModule } from '../layout/pane-menu-comp.module';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { HomeComponent } from '../../components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzAffixModule,
    NzGridModule,
    NzTypographyModule,
    NzImageModule,
    NzIconModule,
    NzModalModule,
    PaneMenuCompModule,
    FriendListCompModule,
  ],
  exports: [HomeComponent]
})
export class HomeCompModule { }
