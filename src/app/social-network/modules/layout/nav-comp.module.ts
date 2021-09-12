import { NzIconModule } from 'ng-zorro-antd/icon';
import { SearchBoxCompModule } from '../search-box/search-box-comp.module';
import { NotificationListCompModule } from '../notification/notification-list-comp.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NavComponent } from '../../components/layout/nav/nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzTypographyModule,
    NzButtonModule,
    NzDrawerModule,
    NzModalModule,
    NzBadgeModule,
    NotificationListCompModule,
    SearchBoxCompModule,
  ],
  exports: [NavComponent]
})
export class NavCompModule { }
