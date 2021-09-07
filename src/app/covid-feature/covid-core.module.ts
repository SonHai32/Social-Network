import { CovidRoutingModule } from './routings/covid-routing.module';
import { HomeCovidModule } from './modules/home.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [HomeCovidModule, CovidRoutingModule],
})
export class CovidCoreModule {}
