import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  imports: [CommonModule],
  exports: [
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
    NzDrawerModule,
    NzModalModule,
    NzImageModule,
    NzSpaceModule,
  ],
  declarations: [],
})
export class ShareAntUiModule {}
