import { DefaultComponent } from './user_view/pages/default/default.component';
import { DefaultRoutingModule } from './user_view/routing/default-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DefaultRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
