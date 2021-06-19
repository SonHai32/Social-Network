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
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule],
  exports: [
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
    NzDrawerModule,
    NzModalModule,
    NzImageModule,
    NzSpaceModule,
    NzAffixModule,
    NzMenuModule,
    NzDividerModule,
    NzAvatarModule,
    NzTagModule,
    NzNoAnimationModule,
    FormsModule,
    NzBadgeModule,
  ],
  declarations: [],
})
export class ShareAntUiModule {}
