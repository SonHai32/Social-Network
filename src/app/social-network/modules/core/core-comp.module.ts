import { HomeCompModule } from './../home/home-comp.module';
import { NavCompModule } from './../layout/nav-comp.module';
import { CoreComponent } from '../../components/core/core.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderCompModule } from '../layout/header-comp.module';
import { FooterCompModule } from '../layout/footer-comp.module';



@NgModule({
  declarations: [CoreComponent],
  imports: [
    CommonModule,
    RouterModule,
    HeaderCompModule,
    FooterCompModule,
    HomeCompModule,
  ],
  exports: [CoreComponent]
})
export class CoreCompModule { }
