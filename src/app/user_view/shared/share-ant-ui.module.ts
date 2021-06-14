import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzTypographyModule,
  ],
  declarations: []
  
  
})
export class ShareAntUiModule { }
