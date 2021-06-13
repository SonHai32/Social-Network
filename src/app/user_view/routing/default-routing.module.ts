import { DefaultComponent } from './../pages/default/default.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {HomeComponent} from '../components/home/home.component'
const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children:[
      {
        path: '',
        component: HomeComponent,
      }
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    RouterModule
  ]
})
export class DefaultRoutingModule { }
