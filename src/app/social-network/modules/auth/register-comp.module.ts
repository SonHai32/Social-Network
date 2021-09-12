import { AuthWithSocialCompModule } from './auth-with-social-comp.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzFormModule,
    NzTypographyModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    AuthWithSocialCompModule,
  ],
  exports: [RegisterComponent]
})
export class RegisterCompModule { }
