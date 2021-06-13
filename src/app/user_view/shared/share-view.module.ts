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

  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    DefaultComponent,
    HeaderComponent,
    FooterComponent,

  ]
})
export class ShareViewModule { }
