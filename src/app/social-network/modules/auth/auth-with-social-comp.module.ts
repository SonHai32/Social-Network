import { NzImageModule } from 'ng-zorro-antd/image';
import { AuthWithSocialComponent } from '../../components/auth/auth-with-social/auth-with-social.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSpaceModule } from 'ng-zorro-antd/space';



@NgModule({
  declarations: [AuthWithSocialComponent],
  imports: [
    CommonModule,
    NzSpaceModule,
    NzImageModule
  ],
  exports: [AuthWithSocialComponent]
})
export class AuthWithSocialCompModule { }
