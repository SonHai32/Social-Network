import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NoDataComponent } from '../../components/layout/no-data/no-data.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [NoDataComponent],
  imports: [CommonModule, NzGridModule, NzTypographyModule],
  exports: [NoDataComponent],
})
export class NoDataCompModule {}
