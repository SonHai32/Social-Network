import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NavCompModule } from './nav-comp.module';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LoginCompModule } from '../auth/login-comp.module';
import { RegisterCompModule } from '../auth/register-comp.module';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { RouterModule } from '@angular/router';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzAvatarModule,
    NzTypographyModule,
    NzAffixModule,
    NzDropDownModule,
    NzGridModule,
    NzModalModule,
    NzImageModule,
    NzIconModule,
    NzButtonModule,
    RegisterCompModule,
    LoginCompModule,
    NavCompModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderCompModule { }
