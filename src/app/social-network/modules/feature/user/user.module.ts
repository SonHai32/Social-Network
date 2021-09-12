import { UserRoutingModule } from './../../../routing/user/user-routing.module';
import { UserInfoCompModule } from './../../user/user-info-comp.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from 'src/app/social-network/components/user-info/user-info.component';
import { UserCompModule } from '../../user/user-comp.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserCompModule,
    UserInfoCompModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
