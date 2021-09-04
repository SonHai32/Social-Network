import { DefaultComponent } from './social-network/pages/default/default.component';
import { DefaultRoutingModule } from './social-network/routing/default-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeCovidComponent } from './covid-feature/components/home-covid/home-covid.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: 'covid',
    loadChildren: () => import('./covid-feature/routings/covid-routing.module').then(m => m.CovidRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DefaultRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
