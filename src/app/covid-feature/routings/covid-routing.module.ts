import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCovidComponent } from '../components/home-covid/home-covid.component';
const routes: Routes = [{ path: '', component: HomeCovidComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CovidRoutingModule {}
