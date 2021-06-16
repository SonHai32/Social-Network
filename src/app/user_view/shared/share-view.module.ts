import { ModalComponent } from './layout/modal/modal.component';
import { DrawerComponent } from './layout/drawer/drawer.component';
import { RegisterComponent } from './layout/auth/register/register.component';
import { AuthWithSocialComponent } from './layout/auth/auth-with-social/auth-with-social.component';
import { LoginComponent } from './layout/auth/login/login.component';
import { ShareAntUiModule } from './share-ant-ui.module';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { DefaultComponent } from './../pages/default/default.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AuthWithSocialComponent,
    RegisterComponent,
    DrawerComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareAntUiModule,
  ],
  exports: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DrawerComponent,
    ModalComponent,
  ]
})
export class ShareViewModule { }
