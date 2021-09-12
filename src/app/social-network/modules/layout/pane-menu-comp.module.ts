import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { PaneMenuComponent } from '../../components/layout/pane-menu/pane-menu.component';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [PaneMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzIconModule,
    NzMenuModule,
    NzDividerModule
  ],
  exports: [PaneMenuComponent]
})
export class PaneMenuCompModule { }
