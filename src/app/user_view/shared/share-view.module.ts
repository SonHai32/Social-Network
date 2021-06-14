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
  ]
})
export class ShareViewModule { }
