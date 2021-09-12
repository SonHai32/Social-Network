import { RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UserInfoComponent } from '../../components/user-info/user-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzTypographyModule,
    NzTabsModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzBadgeModule,
    NzSpinModule,
    NzModalModule,
    ColorPickerModule,
    FormsModule,
  ],
  exports: [UserInfoComponent]
})
export class UserInfoCompModule { }
